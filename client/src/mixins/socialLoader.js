import { loadGoogleSignIn, attachGoogleSignIn } from "@/utils/social/google";

export default {
  name: "socialHandler",
  inject: {
    googleSignInSuccess: {
      default: null
    },
    googleSignInFailure: {
      default: null
    }
  },
  data: () => ({
    // used to enable the button
    disabledGapi: true,
    // used to control google load
    gapiEnabled: false,
    // used to enable the button
    disabledFapi: true,
    // used to control facebook load
    fapiEnabled: false,
    // used to enable the button
    disabledLapi: true,
    // used to control linkedin load
    lapiEnabled: false
  }),
  watch: {
    async gapiEnabled(value) {
      if (value === true) {
        attachGoogleSignIn(this.$refs.google, this.googleSignInSuccess, this.googleSignInFailure);
        this.disabledGapi = false;
      } else {
        this.disabledGapi = true;
      }
    }
  },
  async mounted() {
    // dont use Promise.all => if one failed then all failed
    // with Promise.allSettled, the results are individual
    // and so, we can sign-in with any enabled: if some one fails, then just disabled it
    // add calls when including facebook and linkedin: keep ordered
    // 1: google
    // 2: facebook
    // 3: linkedin
    const [gapi/*, fapi, lapi*/] = await Promise.allSettled([
      loadGoogleSignIn()
    ]);
    this.gapiEnabled = gapi.status === "fulfilled";
  }
}
