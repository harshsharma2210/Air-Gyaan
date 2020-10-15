<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-theme-provider>
      <default-layout />
    </v-theme-provider>
  </v-app>
</template>

<script>
import { useDarkMode } from "@/utils/useDarkMode";

export default {
  name: 'Airgyaan',
  components: {
    DefaultLayout: () => import(/* webpackChunkName: "layout-dependencies" */ "@/components/DefaultLayout")
  },
  data: () => ({
    darkDetector: null,
    nativeDarkMode: undefined
  }),
  async beforeMount() {
    await this.$nextTick();
    this.darkDetector = useDarkMode(
        this.$vuetify,
        dark => (this.nativeDarkMode = dark)
    );
  },
  async beforeDestroy() {
    this.darkDetector && this.darkDetector.destroy();
    this.darkDetector = null;
  },
};
</script>
