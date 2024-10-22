<template>
  <v-app :dark="$vuetify.theme.dark">
      <v-app-bar
          app
          color="primary"
          dense
      >
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
          max-width="500px"
      >
        <sign-in v-if="showSignIn" @signin="signIn" />
      </v-dialog>
      <v-dialog
          v-model="showAddPost"
          max-width="500px"
          persistent
      >
        <app-post
            v-if="showAddPost"
            dialog
            @cancel-post="showAddPost = false"
            @add-post="addPost"
        />
      </v-dialog>
  </v-app>
</template>
<script>
//todo@userquin: mock login until clarified
const mockUiLogin = process.env.VUE_APP_MOCK_UI_LOGIN === "true";

import { languages, changeLanguage } from "@/i18n"
import { mapActions, mapState } from "vuex";

import SignIn from "@/components/SignIn";
import AppPost from "@/components/AppPost";
import AppNavigation from "@/components/AppNavigation";
import apiFetch from "@/mixins/apiFetch";

export default {
  name: "default-layout",
  mixins: [apiFetch],
  components: { AppNavigation, SignIn, AppPost },
  data: () => ({
    available: languages,
    showSignIn: false,
    showAddPost: false,
    showSignUp: false
  }),
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
    }
  },
  methods: {
    ...mapActions(["configureBusy"]),
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
          data = await this.requestSignIn(username, password);
        }
        await this.processLogin(data);
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
        await this.requestSignOut();
      } finally {
        await this.configureBusy(false);
      }
    },
    async addPost(body) {
      try {
        await this.apiPost("posts/add", { body });
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
