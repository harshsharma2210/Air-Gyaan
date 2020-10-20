export default {
  async configureBusy({ commit }, busy) {
    commit("setBusy", busy);
  },
  async processLogin({ commit }, payload) {
    commit("setContextInfo", payload);
  },
  async updateNotifications({ commit }, payload) {
    commit("setNotifications", payload)
  }
};
