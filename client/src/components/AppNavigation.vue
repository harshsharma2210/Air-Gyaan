<template>
  <v-bottom-navigation app v-model="value" @change="navigateTo">
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
          color="accent"
          value="add-post"
          :elevation="addFloating ? 6 : 0"
          :class="['add-post', { fab: addFloating }]"
          :title="addFloating ? $t('App.newPost') : null"
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
  props: {
    initialized: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    addFloating: false,
    value: "home"
  }),
  computed: {
    ...mapState(["loggedIn"]),
    smallButtons() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  async beforeMount() {
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
      if (name && name !== "add-post") {
        await this.$nextTick();
        await this.$router.push({ name });
      }
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
    .v-btn.add-post.theme--light {
      color: white !important;
      &:not(.v-btn--active) {
        color: white !important;
      }
      &:hover {
        color: white !important;
      }
      &:focus {
        color: black !important;
        opacity: 0.75 !important;
        * {
          color: white !important;
        }
        &:hover {
          * {
            color: white !important;
          }
        }
      }
    }
  }
  &.theme--dark {
    .v-btn.add-post.theme--dark {
      color: black !important;
      &:not(.v-btn--active) {
        color: black !important;
      }
      &:hover {
        color: black !important;
      }
      &:focus {
        color: white !important;
        opacity: 0.85 !important;
        * {
          color: black !important;
        }
        &:hover {
          opacity: 1 !important;
        }
      }
    }
  }
  .v-btn.add-post {
    border-radius: 0;
    transition: height 0.5s, width 0.5s, border-radius 0.2s, box-shadow 0.2s, background 0.2s, transform 330ms ease-in-out;
    transform: translate(0, 0) !important;
    &.fab {
      border-radius: 50% !important;
      min-width: initial !important;
      transform: translate(0, -28px) !important;
    }
  }
  .v-btn.v-size--x-small {
    padding: 0;
    min-width: 64px;
  }
}
</style>
