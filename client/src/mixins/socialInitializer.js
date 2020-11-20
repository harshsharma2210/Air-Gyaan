import { loadGoogleSignIn } from "@/utils/social/google";
import { loadLinkedInSignIn } from "@/utils/social/linkedin";

export default {
  name: "socialInitializer",
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
    lapiEnabled: false,
    lurl: null
  }),
  async mounted() {
    // dont use Promise.all => if one failed then all failed
    // with Promise.allSettled, the results are individual
    // and so, we can sign-in with any enabled: if some one fails, then just disabled it
    // add calls when including facebook and linkedin: keep ordered
    // 1: google
    // 2: facebook
    // 3: linkedin
    const [gapi/*, fapi*/, lapi] = await Promise.allSettled([
      loadGoogleSignIn(),
      loadLinkedInSignIn()
    ]);
    this.gapiEnabled = gapi.status === "fulfilled";
    this.lapiEnabled = lapi.status === "fulfilled";
  }

}
