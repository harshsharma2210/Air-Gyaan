export default {
  async configureBusy({ commit }, busy) {
    commit("setBusy", busy);
  },
  processLogin({ commit }, payload) {
    commit("setContextInfo", payload);
  },
  updateNotifications({ commit }, payload) {
    commit("setNotifications", payload)
  }
};
