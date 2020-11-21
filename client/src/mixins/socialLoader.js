import socialInitializer from "@/mixins/socialInitializer";

import { attachGoogleSignIn } from "@/utils/social/google";
import { createLinkedInSignInUrl } from "@/utils/social/linkedin";

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
    },
    async lapiEnabled() {
      this.lurl = createLinkedInSignInUrl();
      this.disabledLapi = false;
    }
  }
}
