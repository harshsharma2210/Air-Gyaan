// http://kazupon.github.io/vue-i18n/en/messages.html
import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";

const messages = {
  // $vuetify: vuetifyMessages,
  // validations: validationMessages
};

const requireLang = require.context("./", true, /\.yml$/);

for (const file of requireLang.keys()) {
  if (file === "./index.js") continue;
  const path = file.replace(/(\.\/|\.yml$)/g, "").split("/");
  path.reduce((o, s, i) => {
    const prop = upperFirst(camelCase(s));
    if (o[prop]) return o[prop];
    o[prop] = i + 1 === path.length ? requireLang(file) : {};
    return o[prop];
  }, messages);
}
export default messages;
