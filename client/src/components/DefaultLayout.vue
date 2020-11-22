<template>
  <v-app :dark="$vuetify.theme.dark">
      <v-app-bar
          app
          color="primary"
          dense
      >
        <air-gyaan-icon />
        <v-toolbar-title>{{ $t("App.title") }}</v-toolbar-title>
        <v-spacer />
        <div key="welcome" v-show="loggedIn && !smallButtons" class="separate-user">{{ welcome }}</div>
        <v-avatar key="avatar" v-show="loggedIn && userAvatar" class="separate-avatar" size="36px">
          <img
              :src="userAvatar"
              :alt="$t('App.avatar', [userName])"
          >
        </v-avatar>
        <v-menu
            key="languages"
            bottom
            close-delay="100"
            content-class="rounded"
            left
            max-height="500"
            offset-y
            open-delay="60"
            :open-on-hover="!smallButtons"
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
        <div key="small" v-if="loggedIn && smallButtons" class="separate-bar">
          <v-menu
              key="options"
              bottom
              close-delay="100"
              content-class="rounded"
              left
              max-height="500"
              offset-y
              open-delay="60"
              :open-on-hover="!smallButtons"
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
              <v-list-item-title><v-subheader class="subtitle-1 text--primary justify-center">{{ userName }}</v-subheader></v-list-item-title>
              <v-list-item @click.prevent="switchDarkLightMode">
                <v-list-item-action>
                  <v-icon>{{ darkLightIcon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="darkLightText"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click.prevent="signOut">
                <v-list-item-action>
                  <v-icon>$vuetify.icons.signout</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="$t('Components.User.signout')"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div key="normal" v-else class="separate-bar">
          <v-btn
              icon
              :title="darkLightText"
              @click="switchDarkLightMode"
          >
            <v-icon>{{ darkLightIcon }}</v-icon>
          </v-btn>
          <v-btn
              v-show="loggedIn"
              key="signout"
              icon
              :title="$t('Components.User.signout')"
              @click="signOut"
          >
            <v-icon>$vuetify.icons.signout</v-icon>
          </v-btn>
          <v-btn
              v-show="!loggedIn"
              key="signin"
              :disabled="disableSignIn"
              icon
              :title="$t('Components.User.signin.signin')"
              @click.native.prevent="$router.push({ path: '/sign-in' })"
          >
            <v-icon>$vuetify.icons.signin</v-icon>
          </v-btn>
          <v-btn
              v-show="!loggedIn"
              key="signup"
              :disabled="disableSignUp"
              icon
              :title="$t('Components.User.signup.signup')"
              @click.native.prevent="$router.push({ path: '/sign-up' })"
          >
            <v-icon>$vuetify.icons.signup</v-icon>
          </v-btn>
        </div>
      </v-app-bar>

      <v-main>
        <router-view :key="$route.fullPath"/>
      </v-main>
      <app-navigation @show-add-post="prepareShowAddPost" :initialized="initialized" />
      <v-dialog
          v-model="showAddPost"
          max-width="500px"
          scrollable
          persistent
      >
        <app-post
            v-if="showAddPost"
            dialog
            :enable-addPost="enableAddPost"
            @cancel-post="showAddPost = false"
            @add-post="addPost"
        />
      </v-dialog>
      <v-dialog
          v-model="showErrorDialog"
          max-width="500px"
          scrollable
      >
        <errors
            v-if="showErrorDialog"
            :title="errorTitle"
            :errors="errorMessages"
            @cancel-errors="showErrorDialog = false"
        />
      </v-dialog>
  </v-app>
</template>
<script>
//todo@userquin: mock login until clarified

import AirGyaanIcon from "@/components/AirGyaanIcon";
const mockUiLogin = process.env.VUE_APP_MOCK_UI_LOGIN === "true";

import apiFetch from "@/mixins/apiFetch";

import socialInitializer from "@/mixins/socialInitializer";
import {
  loadGrecaptcha,
  executeAddPostAction,
  addPostAction,
  executeSignInAction,
  signInAction
} from "@/utils/social/grecaptcha";
import { languages, changeLanguage } from "@/i18n"
import { mapActions, mapState } from "vuex";

import AppPost from "@/components/AppPost";
import AppNavigation from "@/components/AppNavigation";
import Errors from "@/components/Errors";

export default {
  name: "default-layout",
  mixins: [socialInitializer, apiFetch],
  components: { AirGyaanIcon, Errors, AppNavigation, AppPost },
  data: () => ({
    available: languages,
    loadingGrecaptcha: false,
    grecaptchaLoaded: false,
    grecaptchaError: false,
    showAddPost: false,
    showErrorDialog: false,
    errorTitle: null,
    errorMessages: [],
    showSignUp: false,
    initialized: false
  }),
  provide() {
    return {
      signIn: this.signIn,
      googleSignInSuccess: this.googleSignInSuccess,
      googleSignInFailure: this.googleSignInFailure,
      signUp: this.signUp
    }
  },
  async beforeMount() {
    this.$router.afterEach(this.changeSeo);
  },
  mounted() {
    Promise.resolve().then(() => setTimeout(() => (this.initialized = true), 256));
  },
  async created() {
    this.watcher = this.$watch(
        vm => [vm.loggedIn, vm.$route].join(),
        async () => {
          await this.handleLoggedIn();
        },
        { immediate:  true }
    );
  },
  beforeDestroy() {
    this.watcher && this.watcher();
    this.watcher = null;
  },
  computed: {
    ...mapState(["loggedIn", "userName", "userAvatar"]),
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
    },
    disableSignIn() {
      return this.$route && this.$route.name === "sign-in";
    },
    disableSignUp() {
      return this.$route && this.$route.name === "sign-up";
    },
    enableAddPost() {
      return !this.loadingGrecaptcha && this.grecaptchaLoaded && !this.grecaptchaError;
    }
  },
/*
  watch: {
    async loggedIn(value) {
      this.handleLoggedIn(value);
      // if (!this.$route || this.$route.path !== "/") {
      //   await this.$router.push({ path: "/"});
      // }
    }
  },
*/
  methods: {
    ...mapActions(["configureBusy"]),
    async handleLoggedIn() {
      if (this.$route) {
        if (this.loggedIn === false || this.loggedIn === null) {
          const requiresAuth = this.$route.meta && this.$route.meta.requiresAuth === true;
          // handle enter url directly or refresh: F5
          if (requiresAuth && this.$route.path !== "/" && this.$route.path !== "/sign-in") {
            await this.$router.push({ path: "/sign-in"});
          }
        } else {
          if (this.$route.path === "/sign-in" || this.$route.path !== "/sign-up") {
            await this.$router.push({ path: "/"});
          }
        }
      } else {
        await this.$router.push({ path: "/"});
      }
    },
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
        let data;
        if (mockUiLogin) {
          data = {
            authenticated: true,
            platformId: "userquin",
            email: "userquin@gmail.com",
            name: "Joaquín"
          };
        } else {
          const grecaptcha = await executeSignInAction();
          const body = {
            username,
            password,
            grecaptcha,
            action: signInAction
          };
          data = await this.requestSignIn(body);
        }
        await this.processLogin(data);
        await this.configureBusy(false);
        await this.$nextTick();
      } catch (e) {
        //todo: handle error
        await this.configureBusy(false);
      }
    },
    async signOut() {
      await this.configureBusy(true);
      try {
        await this.requestSignOut();
      } finally {
        await this.configureBusy(false);
      }
    },
    async signUp(/*{ username, password }*/) {

    },
    async prepareShowAddPost() {
      await this.prepareRecaptcha();
      this.showAddPost = true;
    },
    async prepareRecaptcha() {
      if (!this.grecaptchaLoaded) {
        await this.configureBusy(true);
        this.loadingGrecaptcha = true;
        loadGrecaptcha()
            .then(this.grecaptchaInitialized)
            .catch(this.grecapchaNotInitilized)
            .finally(async () => {
              await this.configureBusy(false)
            });
      }
    },
    async grecaptchaInitialized() {
      this.loadingGrecaptcha = false;
      this.grecaptchaLoaded = true;
      this.grecaptchaError = false;
    },
    async grecapchaNotInitilized(error) {
      console.error("cannot initialize grecaptcha", error);
      this.loadingGrecaptcha = false;
      this.grecaptchaLoaded = true;
      this.grecaptchaError = true;
      this.loadingGrecaptcha = false;
    },
    async addPost(data) {
      try {
        const grecaptcha = await executeAddPostAction();
        console.info(`Grecaptcha was: ${grecaptcha}`);
        console.info(`Body was: ${data}`);
        const body = Object.assign({}, data, {
          action: addPostAction,
          grecaptcha: grecaptcha
        })
        //todo@userquin: check if home page and then reload?? or just push content to posts
        await this.apiPost("posts/add", { body });
        await this.configureBusy(false);
        await this.$nextTick();
        this.showAddPost = false;
      } catch (e) {
        //todo: handle error
        await this.configureBusy(false);
      }
    },
    async googleSignInSuccess(googleUser) {
      await this.configureBusy(true);
      try {
        // todo@userquin => handle not sign-in => auto sign-up?
        const data = await this.requestSignInGoogle(googleUser.getAuthResponse());
        await this.processLogin(data);
        await this.configureBusy(false);
        await this.$nextTick();
      } catch (e) {
        //todo@userquin: handle error
        await this.configureBusy(false);
      }
    },
    async googleSignInFailure(error) {
      // https://developers.google.com/identity/sign-in/web/reference#error_codes_2
      let message = null;
      if (error) {
        if (error.error !== "popup_closed_by_user") {
          console.error("google sign-in failure", error);
          if (error.error !== "access_denied") {
            message = "other";
          } else {
            message = "access_denied";
          }
        // uncomment following 2 lines for testing purposes
        // } else {
        //   message = "other";
        }
      } else {
        message = "other";
      }
      if (message) {
        this.errorTitle = "Errors.title";
        this.errorMessages.splice(0, this.errorMessages.length, `Errors.google.${message}`);
        setTimeout(() => (this.showErrorDialog = true), 0);
      }
    }
  }
}
</script>
<style lang="scss">
.separate-bar {
  padding-left: 8px;
}
.separate-user {
  padding-right: 16px;
}
.separate-avatar {
  margin-right: 24px;
}
</style>
