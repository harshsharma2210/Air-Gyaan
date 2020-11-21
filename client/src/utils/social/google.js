let google;
let loadingPromise;

const client_id = process.env.VUE_APP_GOOGLE_CLIENT_ID;

const googleOptions = {
  scope: "profile email",
  client_id,
  fetch_basic_profile: true
};

const loadGoogleScript = async () => {
  const el = document.getElementById('google_auth_script');
  if (!el) {
    const gplatformScript = document.createElement('script');
    gplatformScript.setAttribute('src', 'https://apis.google.com/js/platform.js?onload=onGoogleAuthLoad');
    gplatformScript.toggleAttribute("async", true);
    gplatformScript.toggleAttribute("crossorigin", true);
    gplatformScript.setAttribute("defer", "defer");
    gplatformScript.setAttribute("id", "google_auth_script");
    document.head.appendChild(gplatformScript);
  }
}

const onGoogleLoadPromise = () => {
  return new Promise((resolve, reject) => {
    window.onGoogleAuthLoad = () => {
      window.gapi.load('auth2', () => {
        try {
          google = window.gapi.auth2.init(googleOptions);
          resolve(google);
        } catch (err) {
          reject({
            err,
            message: 'client_id missing or is incorrect, or if you added extra params maybe they are written incorrectly, did you add it to the component or plugin?'
          })
        }
      })
    }
  })
}

const loadingGoogleAuth = async () => {
  if (google) {
    return google;
  } else {
    if (!loadingPromise) {
      loadingPromise = onGoogleLoadPromise();
    }
    return loadingPromise;
  }
}


const loadGoogleSignIn = async () => {
  // use Promise.all just because if one of them fails, we cannot sign-in with google.
  await Promise.all([
    loadingGoogleAuth(),
    loadGoogleScript()
  ]);
};

const attachGoogleSignIn = (ref, onsuccess, onfailure) => {
  google && ref && ref.$el && google.attachClickHandler(ref.$el, {}, onsuccess, onfailure);
};

export { loadGoogleSignIn, attachGoogleSignIn };
