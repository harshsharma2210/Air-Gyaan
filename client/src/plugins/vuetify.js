const prod = process.env.NODE_ENV === "production";
const configuration = prod ? "sass" : (process.env.VUE_APP_SASS || "nosass");
const { i18n, vuetify } = require(`./vuetify-${configuration}.js`);

export { i18n, vuetify };
