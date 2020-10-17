// import "@/css/font-roboto.css";
import "@/css/font-montserrat.css";
import Vue from 'vue'
import Airgyaan from '@/Airgyaan.vue';
import { vuetify, i18n } from "@/plugins/vuetify";
import router from '@/router/index'
import store from "@/store";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(Airgyaan)
}).$mount('#app')
