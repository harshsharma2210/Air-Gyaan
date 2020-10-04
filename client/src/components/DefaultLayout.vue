<template>
  <v-app :dark="$vuetify.theme.dark">
      <v-app-bar
          app
          color="primary"
          dense
      >
        <v-toolbar-title>{{ $t("App.title") }}</v-toolbar-title>
        <v-spacer />
        <div key="welcome" v-show="loggedIn && !smallButtons">{{ welcome }}</div>
        <v-menu
            key="languages"
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
                @click="showLogin = true"
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
        <div ref="small" v-if="loggedIn && smallButtons">
          <v-menu
              key="options"
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
                  icon
                  class="text--secondary px-0 px-md-2"
                  text
                  v-on="on"
              >
                <v-icon>$vuetify.icons.menuOptions</v-icon>
              </v-btn>
            </template>
            <v-list dense subheader>
              <v-subheader>{{ userName }}</v-subheader>
              <v-list-item @click="switchDarkLightMode">
                <v-list-item-icon>
                  <v-icon>{{ darkLightIcon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="darkLightText"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="signOut">
                <v-list-item-icon>
                  <v-icon>$vuetify.icons.signout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="$t('Components.User.signout')"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div key="normal" v-else>
          <v-btn icon :title="darkLightText" @click="switchDarkLightMode"><v-icon>{{ darkLightIcon }}</v-icon></v-btn>
          <v-btn v-show="loggedIn"  key="signout" icon :title="$t('Components.User.signout')" @click="signOut"><v-icon>$vuetify.icons.signout</v-icon></v-btn>
          <v-btn v-show="!loggedIn" key="signin" icon :title="$t('Components.User.signin.signin')" @click="showSignIn = true"><v-icon>$vuetify.icons.signin</v-icon></v-btn>
          <v-btn v-show="!loggedIn" key="signup" icon :title="$t('Components.User.signup.signup')"><v-icon>$vuetify.icons.signup</v-icon></v-btn>
        </div>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
      <app-navigation @show-add-post="showAddPost = true"></app-navigation>
      <v-dialog
          v-model="showSignIn"
          max-width="460px"
      >
        <sign-in v-if="showSignIn" @signin="signIn" />
      </v-dialog>
      <v-dialog
          v-model="showAddPost"
          max-width="460px"
          persistent
      >
        <app-post
            v-if="showAddPost"
            @cancel-post="showAddPost = false"
            @add-post="addPost"
        />
      </v-dialog>
  </v-app>
</template>
<script>
import { languages, changeLanguage } from "@/i18n"
import { mapActions, mapState } from "vuex";
import { useDarkMode } from "@/utils/useDarkMode";

import SignIn from "@/components/SignIn";
import AppPost from "@/components/AppPost";
import AppNavigation from "@/components/AppNavigation";

export default {
  name: "default-layout",
  components: { AppNavigation, SignIn, AppPost },
  data: () => ({
    darkDetector: null,
    available: languages,
    showSignIn: false,
    showAddPost: false,
    showSignUp: false
  }),
  computed: {
    ...mapState(["loggedIn", "userName"]),
    welcome() {
      if (this.userName) {
        return this.$t("Components.User.welcome", [this.userName]);
      }
      return null;
    },
    darkLightText() {
      return this.$vuetify.theme.dark ? this.$t("App.lightMode") : this.$t("App.darkMode");
    },
    darkLightIcon() {
      return this.$vuetify.theme.dark ? "$vuetify.icons.lightMode" : "$vuetify.icons.darkMode";
    },
    smallButtons() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  async beforeMount() {
    this.darkDetector = useDarkMode(this.$vuetify);
  },
  async beforeDestroy() {
    this.darkDetector && this.darkDetector.destroy();
    this.darkDetector = null;
  },
  methods: {
    ...mapActions(["configureBusy", "processLogin"]),
    async changeLocale(locale) {
      await changeLanguage(locale);
    },
    async switchDarkLightMode() {
      await this.$nextTick();
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    // eslint-disable-next-line no-unused-vars
    async signIn({ username, password }) {
      await this.configureBusy(true);
      try {
        console.info(`Using ${username}/***** credentials`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.processLogin({ authenticated: true, userId: 1, userName: "Joaquín Sánchez Jiménez"});
        await this.configureBusy(false);
        await this.$nextTick();
        this.showSignIn = false;
      } catch (e) {
        //todo: handle error
        await this.configureBusy(false);
      }
    },
    async signOut() {
      await this.configureBusy(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 150));
      } finally {
        //todo: handle error
        await this.processLogin({ autheticated: false });
        await this.configureBusy(false);
      }
    },
    async addPost(post) {
      await this.configureBusy(true);
      try {
        console.info(`Adding post ${JSON.stringify(post)}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.configureBusy(false);
        await this.$nextTick();
        this.showAddPost = false;
      } catch (e) {
        //todo: handle error
        await this.configureBusy(false);
      }
    }
  }
}
</script>
