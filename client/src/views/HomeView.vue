<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t("Views.Home.welcome") }}
        </h1>

        <p class="subheading font-weight-regular">
          {{ $t("Views.Home.for-help") }}
          <br>{{ $t("Views.Home.join-discord") }}
          <a
              :href="$t('Views.Home.discord-url')"
              :title="$t('Views.Home.discord-community-alt')"
              target="_blank"
          >{{ $t("Views.Home.discord-community") }}</a>
        </p>
      </v-col>

      <v-col
          class="mb-5"
          cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          {{ $t("Views.Home.router-sample") }}
        </h2>
        <v-row justify="center">
          <router-link to="post">{{ $t("Views.Home.go-post") }}</router-link>
        </v-row>
      </v-col>

        <v-col
          class="mb-5"
          cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          {{ $t("Views.Home.whats-next") }}
        </h2>

        <v-row justify="center">
          <a
              v-for="(next, i) in ecosystemLinks"
              :key="i"
              :href="next.href"
              class="subheading mx-3"
              target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
          class="mb-5"
          cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          {{ $t("Views.Home.important-links") }}
        </h2>

        <v-row justify="center">
          <a
              v-for="(link, i) in importantLinks"
              :key="i"
              :href="link.href"
              class="subheading mx-3"
              target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
          class="mb-5"
          cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          {{ $t("Views.Home.ecosystem") }}
        </h2>

        <v-row justify="center">
          <a
              v-for="(eco, i) in ecosystemLinks"
              :key="i"
              :href="eco.href"
              class="subheading mx-3"
              target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
  data: () => ({
    ecosystemLinks: [],
    importantLinks: [],
    whatsNextLinks: [],
  }),
  watch: {
    "$i18n.locale": {
      async handler() {
        await this.loadLinks();
      },
      immediate: true
    }
  },
  methods: {
    async loadLinks() {
      try {
        const home = await import(`@/lang/${this.$i18n.locale}/Views/home.yml`);
        this.ecosystemLinks = home["ecosystem-entries"];
        this.importantLinks = home["important-links-entries"];
        this.whatsNextLinks = home["whats-next-entries"];
      } catch (e) {
        // just ignore
      }
    }
  }
}
</script>
