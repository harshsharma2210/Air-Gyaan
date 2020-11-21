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

import apiFetch from "@/mixins/apiFetch";
import camelCase from "lodash/camelCase";
import debounce from "lodash/debounce";
import upperFirst from "lodash/upperFirst";

import { useDarkMode } from "@/utils/useDarkMode";
import { initializeLanguage } from "@/i18n";

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
  watch: {
    "$i18n.locale": {
      async handler() {
        await this.changeSeo(this.$route);
      },
      immediate: true
    }
  },
  async beforeMount() {
    await this.$nextTick();
    this.darkDetector = useDarkMode(
        this.$vuetify,
        dark => (this.nativeDarkMode = dark)
    )
    this.$router.afterEach(this.changeSeo);
    await Promise.allSettled([
      initializeLanguage(),
      this.checkContext()
    ])
  },
  async beforeDestroy() {
    this.darkDetector && this.darkDetector.destroy();
    this.darkDetector = null;
  },
  methods: {
    changeSeo: debounce(async function(to) {
      if (to) {
        const { meta } = to;
        let title = meta && meta.title;
        if (!title || title.length === 0) {
          let name = to.name;
          if (!name || name.length === 0) {
            name = to.toString();
            if (name.startsWith("/")) {
              name = name.substring(1);
            }
          }
          title = `Views.${upperFirst(camelCase(name))}.title`;
        }
        document.title = [
          this.$t(title),
          this.$t("App.title")
        ].join(" - ");
        let description = meta && meta.description;
        if (!description || description.length === 0) {
          const descriptionKey = `Views.${upperFirst(camelCase(to.name))}.description`
          if (this.$te(descriptionKey)) {
            description = this.$t(descriptionKey);
          }
        }
        if (description) {
          document.querySelector('meta[name="description"]').setAttribute("content", description);
        }
      }
    }, 128),
    async checkContext() {
      if (mockUiLogin === false) {
        await apiFetch.methods.checkContext.call(this);
      }
    }
  }
};
</script>
