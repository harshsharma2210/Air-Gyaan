export default {
  async configureBusy({ commit }, busy) {
    commit("setBusy", busy);
  },
  processLogin({ commit }, payload) {
    commit("setContextInfo", payload);
  }
};
