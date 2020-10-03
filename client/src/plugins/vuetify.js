const prod = process.env.NODE_ENV === "production";
const configuration = prod ? "sass" : (process.env.SASS || "nosass");

const { i18n, vuetify } = require(`./vuetify-${configuration}.js`);

export { i18n, vuetify };
