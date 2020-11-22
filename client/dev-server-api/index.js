"use strict";

const fetch = require("node-fetch");

const { OAuth2Client } = require('google-auth-library');

const googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(googleClientId, process.env.VUE_APP_GOOGLE_CLIENT_SECRET);

const linkedInClientId = process.env.VUE_APP_LINKEDIN_APP_ID;
const linkedInSecretKey = process.env.VUE_APP_LINKEDIN_APP_SECRET;
const linkedInCallbackUrl = process.env.VUE_APP_LINKEDIN_CALLBACK_URL;

const {
  signInAction,
  verifyGrecaptcha
} = require("./grecaptcha");


const configureUsers = require("./users");
const configureEntityHandlers = require("./entity");

let publicPath = process.env.BASE_URL || "/";
if (!publicPath.startsWith("/")) {
  publicPath = `/${publicPath}`;
}
if (!publicPath.endsWith("/")) {
  publicPath += "/";
}

let ids = 1;
const cookies = new Map();
const users = new Map();


// add any method using this for req and res: http://expressjs.com/es/api.html

const requiresSignInResponse = () => {
  return {
    authenticated: false,
    hasGlobalErrors: false,
    hasErrors: false,
    hasPageErrors: false
  };
};

const extractCookie = req => {
  const cookie = req.get("Cookie");
  if (cookie) {
    const sessionId = cookie.split(";").find(c => {
      return c && c.trim().startsWith("AIRGYAAN=");
    });
    if (sessionId) {
      return sessionId.trim().substr(9);
    }
  }
  return null;
};

const addCookie = (res, id) => {
  res.cookie("AIRGYAAN", id, {
    path: publicPath,
    secure: process.env.HTTPS === true,
    httpOnly: true,
    SameSite: "Lax"
  });
};

const deleteCookie = (req, res) => {
  const cookie = extractCookie(req);
  if (cookie && cookies.has(cookie)) {
    cookies.delete(cookie);
  }
  res.clearCookie("AIRGYAAN", {
    path: publicPath,
    secure: process.env.HTTPS === true,
    httpOnly: true
  });
};

const sendUserInfo = (
  res,
  cookieId,
  {
    platformId,
    email,
    name,
    pic
  }
) => {
  addCookie(res, cookieId);
  res.json({
    authenticated: true,
    platformId,
    email,
    name,
    pic
  })
};

const handleCheckContext = (req, res) => {
  const cookie = extractCookie(req);
  let signedIn = false;
  if (cookie && cookies.has(cookie)) {
    const { id, username } = cookies.get(cookie);
    if (username && users.has(username)) {
      signedIn = true;
      sendUserInfo(res, id, users.get(username));
    }
  }
  if (!signedIn) {
    res.json(requiresSignInResponse());
  }
};

const handleSignIn = async (req, res) => {
  const {
    username,
    password,
    action,
    grecaptcha
  } = req.body;
  if (action === signInAction && !!grecaptcha) {
    const verifyError = await verifyGrecaptcha(signInAction, grecaptcha);
    if (verifyError.valid) {
      let signedIn = false;
      if (username && password && users.has(username)) {
        const userData = users.get(username);
        if (userData.userPassword === password) {
          const id = `id-${ids++}`;
          signedIn = true;
          cookies.set(id, {
            id,
            username
          });
          sendUserInfo(res, id, userData);
        }
      }
      if (!signedIn) {
        res.json(requiresSignInResponse());
      }
    } else {
      const response = requiresSignInResponse();
      response.errorKey = "recaptcha-error";
      response.error = verifyError.error.message || "unknown";
      res.json(response);
    }
  } else {
    const response = requiresSignInResponse();
    response.errorKey = "recaptcha-error";
    res.json(response);
  }
};

const verifyGoogleToken = async idToken => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: googleClientId
  });
  return ticket.getPayload();
}

// https://developers.google.com/identity/sign-in/web/backend-auth
const handleSignInGoogle = async (req, res) => {
  const { token } = req.body;
  const googleInfo = token && (await verifyGoogleToken(token));
  let signedIn = false;
  if (googleInfo) {
    let username = googleInfo.email;
    if (username) {
      let id;
      let userData;
      if (users.has(username)) {
        id = `id-${ids++}`;
        userData = users.get(username);
      } else {
        username = username.substring(0, username.lastIndexOf("@"));
        if (users.has(username)) {
          id = `id-${ids++}`;
          userData = users.get(username);
        }
      }
      if (id) {
        signedIn = true;
        cookies.set(id, {
          id,
          username
        });
        sendUserInfo(res, id, userData);
      }
    }
  }
  if (!signedIn) {
    res.json(requiresSignInResponse());
  }
};

const verifyLinkedInToken = async code => {
  const body = new URLSearchParams();
  body.append("grant_type", "authorization_code");
  body.append("code", code);
  body.append("redirect_uri", linkedInCallbackUrl);
  body.append("client_id", linkedInClientId);
  body.append("client_secret", linkedInSecretKey);
  // https://github.com/node-fetch/node-fetch#post-with-form-parameters
  const accessTokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    body
  });
  const { access_token: token } = await accessTokenResponse.json();
  if (token) {
    // https://docs.microsoft.com/en-us/linkedin/shared/integrations/people/primary-contact-api#retrieve-email-address
    const options = {
      headers: { "Accept": "application/json" },
      method: "GET"
    };
    const emailResponse = await fetch(
      `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=${token}`,
      options
    );
    const data = await emailResponse.json();
    // https://docs.microsoft.com/en-us/linkedin/shared/integrations/people/primary-contact-api#sample-response
    const { elements } = data;
    if (elements && Array.isArray(elements) && elements.length > 0) {
      let email;
      for (let i = 0; i < elements.length; i++) {
        if (elements[i]["handle~"]) {
          email = elements[i]["handle~"].emailAddress;
          if (email) {
            if (users.has(email)) {
              return email;
            } else {
              email = email.substring(0, email.lastIndexOf("@"));
              if (users.has(email)) {
                return email;
              }
            }
          }
        }
      }
    }
  }
  return null;
}

// https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin?context=linkedin/consumer/context
const handleSignInLinkedIn = async (req, res) => {
  const code = req.query.code;
  const username = code && (await verifyLinkedInToken(code));
  if (username && users.has(username)) {
    const id = `id-${ids++}`;
    cookies.set(id, {
      id,
      username
    });
    addCookie(res, id);
  }
  res.redirect(302, "/");
};

const handleSignOut = (req, res) => {
  deleteCookie(req, res);
  res.json(requiresSignInResponse());
};

const handleAvatar = (req, res) => {
  const username = req.params.username;
  let path = null;
  if (username && users.has(username)) {
    const { picPath } = users.get(username);
    if (picPath) {
      path = picPath;
    }
  }
  if (path) {
    res.sendFile(path);
  } else {
    res.sendStatus(404);
  }
};

const devServerApi = (app, server) => {
  const apiPath = `${publicPath}api/`;
  configureUsers(users, apiPath);
  const bodyParser = require("body-parser");
  // all form will submit json
  app.use(bodyParser.json());
  // required for sign-in: form application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // client routes
  app.get(`${apiPath}check-context`, handleCheckContext);
  app.get(`${apiPath}avatar/:username`, handleAvatar);
  app.post(`${apiPath}sign-in`, handleSignIn);
  app.post(`${apiPath}sign-in-google`, handleSignInGoogle);
  app.get(`/auth/linkedin/callback`, handleSignInLinkedIn);
  app.post(`${apiPath}sign-out`, handleSignOut);
  // client entity routes
  configureEntityHandlers(app, apiPath);
};

module.exports = devServerApi;
