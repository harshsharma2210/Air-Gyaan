import { mapActions } from "vuex";
import fetchRequestBuilder from "@/utils/fetch/fetchRequestBuilder";
export default {
  name: "apiFetch",
  methods: {
    ...mapActions(["processLogin"]),
    async checkContext() {
      try {
        const request = await fetchRequestBuilder("check-context", {
          method: "GET"
        });
        const response = await fetch(request);
        const data = await response.json();
        await this.processLogin(data);
      } catch (e) {
        // just ignore
        console.error("cannot check context", e);
      }

    },
    async requestSignIn(username, password) {
      const request = await fetchRequestBuilder("sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: {
          username,
          password
        }
      });
      const response = await fetch(request);
      return await response.json();
    },
    async requestSignOut() {
      try {
        const request = await fetchRequestBuilder("sign-out", {
          method: "POST"
        });
        await fetch(request);
      } catch (e) {
        // just ignore
      } finally {
        this.$nextTick(() => this.processLogin({ autheticated: false }));
      }
    },
    async apiGet(url, options = {}) {
      options.method = "GET";
      return await this.apiRequest(url, options);
    },

    async apiPost(url, options = {}) {
      options.method = "POST";
      return await this.apiRequest(url, options);
    },

    async apiPut(url, options = {}) {
      options.method = "PUT";
      return await this.apiRequest(url, options);
    },

    async apiDelete(url, options = {}) {
      options.method = "DELETE";
      return await this.apiRequest(url, options);
    },
    async apiRequest(url, options) {
      const request = await fetchRequestBuilder(options);
      const response = await fetch(url, request);
      return await response.json();
    }
  }

};
