<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dense
    >
      <v-toolbar-title>{{ $t("App.title") }}</v-toolbar-title>
      <v-spacer />
      <v-menu
          bottom
          close-delay="100"
          content-class="rounded"
          left
          max-height="500"
          offset-y
          open-delay="60"
          open-on-hover
          transition="slide-y-transition"
      >
        <template #activator="{ on }">
          <v-btn
              :icon="$vuetify.breakpoint.smAndDown"
              class="text--secondary px-0 px-md-2"
              text
              v-on="on"
          >
            <v-icon>$vuetify.icons.translate</v-icon>

            <v-icon>$vuetify.icons.down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
              v-for="lang in available"
              :key="lang.locale"
              class="v-list-item--default"
              @click="changeLocale(lang.locale)"
              replace
          >
            <v-list-item-title v-text="lang.name" />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { languages, changeLanguage } from "@/i18n"
export default {
  name: 'Airgyaan',
  data: () => ({
    available: languages
  }),
  methods: {
    async changeLocale(locale) {
      await changeLanguage(locale);
    }
  }
};
</script>
