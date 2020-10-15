import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    baseUrl: process.env.BASE_URL,
    apiUrl: "api/",
    loggedIn: null,
    userId: null,
    userName: null,
    busy: false,
    notifications: 0
  },
  getters: {
    loggedIn: state => {
      return state.loggedIn;
    },
    userId: state => {
      return state.userId;
    },
    userName: state => {
      return state.userName;
    },
    busy: state => {
      return state.busy;
    },
    notifications: state => {
      return state.notifications;
    }
  },
  mutations: {
    setContextInfo(state, payload) {
      const authenticated = payload.authenticated === true;
      if (authenticated) {
        state.userId = payload.userId;
        state.userName = payload.userName;
      } else {
        state.userId = null;
        state.userName = null;
      }
      state.loggedIn = authenticated;
    },
    setBusy(state, busy) {
      state.busy = busy;
    },
    setNotifications(state, notifications) {
      state.notifications = notifications || 0;
    }
  },
  actions
});
