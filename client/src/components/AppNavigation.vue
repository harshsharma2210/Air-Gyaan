<template>
  <v-bottom-navigation app v-model="value">
    <v-btn value="home" :x-small="smallButtons">
      <span>{{ $t("App.home") }}</span>
      <v-icon>$vuetify.icons.home</v-icon>
    </v-btn>

    <v-btn value="explore-web" :x-small="smallButtons">
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
      <v-btn v-show="loggedIn" value="notifications" :x-small="smallButtons">
        <span>{{ $t("App.notifications") }}</span>
        <v-icon>$vuetify.icons.notifications</v-icon>
      </v-btn>
    </v-fade-transition>

    <v-fade-transition mode="out-in">
      <v-btn v-show="loggedIn" value="me" :x-small="smallButtons">
        <span>{{ $t("App.me") }}</span>
        <v-icon>$vuetify.icons.account</v-icon>
      </v-btn>
    </v-fade-transition>

  </v-bottom-navigation>
</template>
<script>
import { mapState } from "vuex";
import detectPassiveEvents from "@/utils/detectPassiveEvents";

export default {
  name: "app-navigation",
  data: () => ({
    addFloating: false,
    value: undefined
  }),
  computed: {
    ...mapState(["loggedIn"]),
    smallButtons() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  watch: {
    value: {
      async handler(newVal, oldVal) {
        if (newVal && oldVal !== undefined) {
          await this.navigateTo(newVal);
        }
      },
      immediate: true
    }
  },
  async beforeMount() {
    this.value = this.$route.name;
    this.addFloating = window.scrollY === 0;
    if (detectPassiveEvents.hasSupport) {
      window.addEventListener("scroll", this.onScroll,{ passive: true, capture: false });
    } else {
      window.addEventListener("scroll", this.onScroll, false);
    }
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
  .v-btn.v-size--x-small {
    padding: 0;
    min-width: 64px;
  }
}
</style>
