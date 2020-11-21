// import "@/css/font-roboto.css";
import "@/css/font-montserrat.css";
import Vue from 'vue'
import AirGyaan from '@/AirGyaan.vue';
import { vuetify, i18n } from "@/plugins/vuetify";
import router from "@/router";
import store from "@/store";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(AirGyaan)
}).$mount('#app')
