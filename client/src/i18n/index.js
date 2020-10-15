import Vue from "vue";
import VueI18n from "vue-i18n";
import languages from "@/data/languages.yml";

const COUNTRY_AND_LANG = process.env.VUE_APP_COUNTRY_AND_LANG || "en-US";

const defaultMessages = require(`@/lang/${COUNTRY_AND_LANG}`);

const options = {
  locale: COUNTRY_AND_LANG,
  messages: {},
  fallbackLocale: COUNTRY_AND_LANG,
  silentTranslationWarn: process.env.NODE_ENV === "production"
};
options.messages[`${COUNTRY_AND_LANG}`] = defaultMessages.default;

Vue.use(VueI18n);

const locales = languages.map(l => l.locale);

const languageCookieName =
  process.env.VUE_APP_LANG_COOKIE_NAME || "AppLanguage";

export const i18n = new VueI18n(options);

const loadedLanguages = [COUNTRY_AND_LANG];

const languageCookiePath = process.env.BASE_URL || "/";

const setI18nLanguage = lang => {
  i18n.locale = lang;
  document.querySelector("html").setAttribute("lang", lang);
  document.cookie = `${languageCookieName}=${lang};path=${languageCookiePath}`;
  return lang;
};

export {  languages };

export const changeLanguage = lang => {
  if (!loadedLanguages.includes(lang)) {
    return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`)
      .then(msgs => {
        loadedLanguages.push(lang);
        const messages = msgs.default;
        i18n.setLocaleMessage(lang, messages);
        return Promise.resolve(setI18nLanguage(lang));
      })
      .catch(error => {
        console.error(`cannot load language definitions for ${lang}`, error);
        return Promise.reject(error);
      });
  }
  return Promise.resolve(setI18nLanguage(lang));
};

export const initializeLanguage = () => {
  return new Promise((resolve, reject) => {
    const cookie = new Map(
      document.cookie.split("; ").map(c => c.split("="))
    ).get(languageCookieName);
    // 1. calculate locale to use
    let localeToUse = languages[0].locale;
    if (cookie) {
      const index = locales.findIndex(l => l === cookie);
      if (index !== -1) {
        localeToUse = languages[index].locale;
      }
    } else {
      // if the lang matches i18n lang then just configure cookie and resolve
      if (navigator.language !== localeToUse) {
        const newLocale = navigator.languages.find(
          l => locales.indexOf(l) !== -1
        );
        if (newLocale && newLocale.locale) {
          localeToUse = newLocale.locale;
        }
      }
    }
    // 2. check if locale data is loaded
    const localeLoaded =
      loadedLanguages.findIndex(l => l === localeToUse) !== -1;
    if (localeLoaded) {
      setI18nLanguage(localeToUse);
      resolve();
    } else {
      // 3. load locale if not loaded
      changeLanguage(localeToUse)
        .catch(error => reject(error))
        .finally(() => resolve());
    }
  });
};

export const routeMiddleware = (to, from, next) => {
  // Load async message files here
  const lang = to.params.lang
  if (!lang || locales.indexOf(lang) === -1) {
    return next(`/${COUNTRY_AND_LANG}`)
  }
  if (loadedLanguages.indexOf(lang) > -1) {
    return next();
  }
  return changeLanguage(lang).then(() => next())
}

