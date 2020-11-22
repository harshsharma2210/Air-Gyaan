const sitekey = process.env.VUE_APP_GRECAPTCHA_SITE_KEY;

const signInAction = "signin";
const addPostAction = "addpost";

let loadingPromise;
let grecaptchaValue;

const loadGrecaptchaScript = async () => {
  const script = document.getElementById("grecatpcha_script");
  if (!script) {
    const grecatpchaScript = document.createElement("script");
    grecatpchaScript.setAttribute("src", `https://www.google.com/recaptcha/api.js?render=explicit&onload=grecaptchaLoaded`);
    grecatpchaScript.toggleAttribute("async", true);
    grecatpchaScript.setAttribute("defer", "defer");
    grecatpchaScript.setAttribute("id", "grecatpcha_script");
    document.head.appendChild(grecatpchaScript);
  }
}
//
const onGrecaptchaLoadPromise = () => {
  return new Promise((resolve, reject) => {
    window.grecaptchaLoaded = async () => {
      try {
        grecaptchaValue = window.grecaptcha.render("grecaptcha", { sitekey, size: "invisible" });
        resolve(grecaptchaValue);
      } catch (e) {
        reject(e);
      }
    }
  })
}

const loadingGrecaptcha = async () => {
  if (grecaptchaValue) {
    return grecaptchaValue;
  } else {
    if (!loadingPromise) {
      loadingPromise = onGrecaptchaLoadPromise();
    }
    return loadingPromise;
  }
}


const loadGrecaptcha = async () => {
  // use Promise.all just because if one of them fails, we cannot sign-in with google.
  try {
    // eslint-disable-next-line
    const [response, script] = await Promise.all([
      loadingGrecaptcha(),
      loadGrecaptchaScript()
    ]);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

const executeGrecaptchaAction = async action => {
  return window.grecaptcha.execute(grecaptchaValue, { action });
}

const executeSignInAction = async () => {
  return await executeGrecaptchaAction(signInAction);
}

const executeAddPostAction = async () => {
  return await executeGrecaptchaAction(addPostAction);
}

export {
  loadGrecaptcha,
  executeSignInAction,
  executeAddPostAction,
  addPostAction,
  signInAction
};
