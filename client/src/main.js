import "@/css/font-roboto.css";
import Vue from 'vue'
import App from '@/App.vue'
import { vuetify, i18n } from "@/plugins/vuetify";
import router from '@/router/index'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
