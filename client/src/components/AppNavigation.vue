<template>
  <v-bottom-navigation app>
    <v-btn @click="navigateTo('home')">
      <span>{{ $t("App.home") }}</span>
      <v-icon>$vuetify.icons.home</v-icon>
    </v-btn>

    <v-btn @click="navigateTo('explore-web')">
      <span>{{ $t("App.explore") }}</span>
      <v-icon>$vuetify.icons.searchWeb</v-icon>
    </v-btn>

    <v-fade-transition mode="out-in">
      <v-btn
          v-show="loggedIn"
          :elevation="addFloating ? 6 : 0"
          :class="['add-post', { fab: addFloating }]"
          :title="addFloating ? $t('App.newPost') : null"
          color="accent"
          @click="$emit('show-add-post')"
      >
        <span v-show="!addFloating">{{ $t("App.newPost") }}</span>
        <v-icon>$vuetify.icons.add</v-icon>
      </v-btn>
    </v-fade-transition>

    <v-fade-transition mode="out-in">
      <v-btn v-show="loggedIn" @click="navigateTo('notifications')">
        <span>{{ $t("App.notifications") }}</span>
        <v-icon>$vuetify.icons.notifications</v-icon>
      </v-btn>
    </v-fade-transition>

    <v-fade-transition mode="out-in">
      <v-btn v-show="loggedIn" @click="navigateTo('me')">
        <span>{{ $t("App.me") }}</span>
        <v-icon>$vuetify.icons.account</v-icon>
      </v-btn>
    </v-fade-transition>

  </v-bottom-navigation>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "app-navigation",
  data: () => ({
    addFloating: false,
    loop: null
  }),
  computed: {
    ...mapState(["loggedIn"])
  },
  async beforeMount() {
    this.addFloating = window.scrollY === 0;
    window.addEventListener("scroll", this.onScroll);
  },
  async beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    async navigateTo(name) {
      await this.$nextTick();
      await this.$router.push(name);
    },
    async onScroll(e) {
      this.addFloating = e.target.scrollingElement.scrollTop === 0;
    }
  }
}
</script>
<style lang="scss">
.v-bottom-navigation {
  &.theme--light {
    .v-btn.add-post {
      color: white !important;
    }
  }
  &.theme--dark {
    .v-btn.add-post {
      color: black !important;
    }
  }
  .v-btn.add-post {
    border-radius: 0;
    transition: height 0.5s, width 0.5s, border-radius 0.2s, box-shadow 0.2s, background 0.2s, transform 330ms ease-in-out;
    &.fab {
      border-radius: 50% !important;
      min-width: initial !important;
      transform: translate(0, -28px);
    }
  }
}
</style>
