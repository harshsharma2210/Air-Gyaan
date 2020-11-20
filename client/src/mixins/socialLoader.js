import socialInitializer from "@/mixins/socialInitializer";

import { attachGoogleSignIn } from "@/utils/social/google";

export default {
  name: "socialLoader",
  mixins: [socialInitializer],
  inject: {
    googleSignInSuccess: {
      default: null
    },
    googleSignInFailure: {
      default: null
    }
  },
  watch: {
    async gapiEnabled(value) {
      if (value === true) {
        attachGoogleSignIn(this.$refs.google, this.googleSignInSuccess, this.googleSignInFailure);
        this.disabledGapi = false;
      } else {
        this.disabledGapi = true;
      }
    }
  }
}
