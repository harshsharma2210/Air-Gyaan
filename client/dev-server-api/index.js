"use strict";

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
    httpOnly: true
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

const handleSignIn = (req, res) => {
  const { username, password } = req.body;
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
  // const fs = require("fs");
  const bodyParser = require("body-parser");
  // all form will submit json
  app.use(bodyParser.json());
  // required for sign-in: form application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // client routes
  app.get(`${apiPath}check-context`, handleCheckContext);
  app.get(`${apiPath}avatar/:username`, handleAvatar);
  app.post(`${apiPath}sign-in`, handleSignIn);
  app.post(`${apiPath}sign-out`, handleSignOut);
  // client entity routes
  configureEntityHandlers(app, apiPath);
};

module.exports = devServerApi;
