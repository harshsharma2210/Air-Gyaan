const fetch = require("node-fetch");

const secret = process.env.VUE_APP_GRECAPTCHA_SECRET_KEY;
const score = parseInt(process.env.VUE_APP_GRECAPTCHA_SCORE || 85) / 100;

const signInAction = "signin";
const addPostAction = "addpost";

const verifyGrecaptcha = async (action, grecaptcha) => {
  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", grecaptcha);
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body
    });
    const { success, action: responseAction, score: responseScore } = await response.json();
    if (success === true && action === responseAction && responseScore && responseScore >= score) {
      return { valid: true, score: responseScore };
    }
    return { valid: false, score: responseScore };
  } catch (e) {
    return {
      valid: false,
      error: e
    }
  }
};

module.exports = {
  signInAction,
  addPostAction,
  verifyGrecaptcha
};
