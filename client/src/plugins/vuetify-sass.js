import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { i18n, vuetifyOptions } from "./vuetify-options";

Vue.use(Vuetify);

const vuetify = new Vuetify(vuetifyOptions);

export {
  i18n,
  vuetify
}
