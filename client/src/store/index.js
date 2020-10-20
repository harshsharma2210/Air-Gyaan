import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    loggedIn: null,
    userId: null,
    userName: null,
    userEmail: null,
    userAvatar: null,
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
    userEmail: state => {
      return state.userEmail;
    },
    userAvatar: state => {
      return state.userAvatar;
    },
    busy: state => {
      return state.busy;
    },
    notifications: state => {
      return state.notifications;
    }
  },
  mutations: {
    setContextInfo(state, { authenticated = false, platformId, name, email, pic = null }) {
      if (authenticated === true) {
        state.userId = platformId;
        state.userName = name;
        state.userEmail = email;
        state.userAvatar = pic;
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
        state.userId = null;
        state.userName = null;
        state.userEmail = null;
        state.userAvatar = null;
      }
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
