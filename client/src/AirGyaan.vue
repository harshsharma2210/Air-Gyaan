<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-theme-provider root>
      <default-layout />
    </v-theme-provider>
  </v-app>
</template>

<script>
//todo@userquin: mock login until clarified
const mockUiLogin = process.env.VUE_APP_MOCK_UI_LOGIN === "true";

import { useDarkMode } from "@/utils/useDarkMode";
import apiFetch from "@/mixins/apiFetch";

export default {
  name: 'AirGyaan',
  mixins: [apiFetch],
  components: {
    DefaultLayout: () => import(/* webpackChunkName: "layout-dependencies" */ "@/components/DefaultLayout")
  },
  data: () => ({
    darkDetector: null,
    nativeDarkMode: undefined
  }),
  async beforeMount() {
    await this.$nextTick();
    // eslint-disable-next-line no-unused-vars
    this.darkDetector = useDarkMode(
        this.$vuetify,
        dark => (this.nativeDarkMode = dark)
    )
    await this.checkContext();
  },
  async beforeDestroy() {
    this.darkDetector && this.darkDetector.destroy();
    this.darkDetector = null;
  },
  methods: {
    async checkContext() {
      if (mockUiLogin === false) {
        await apiFetch.methods.checkContext.call(this);
      }
    }
  }
};
</script>
