<template>
  <div :class="['sign-up-container', { mobile: $vuetify.breakpoint.xsOnly }]">
    <v-card class="elevation-0 border-0">
      <v-card-title class="justify-center">{{ title }}</v-card-title>
      <v-card-subtitle class="text-center">{{ subtitle }}</v-card-subtitle>
      <v-card-text>
        <v-form class="signup-form pt-4" @submit.prevent="fireSubmit" lazy-validation>
          <v-text-field
              ref="username"
              v-model="form.username"
              :label="$t('Components.User.signup.username')"
              :rules="usernameRules"
              counter
              dense
              @keyup.enter.prevent="fireSubmit"
          ></v-text-field>
          <!-- passwords MUST have an id -->
          <v-text-field
              id="password"
              ref="password"
              :type="passwordType"
              v-model="form.password"
              :append-icon="passwordIcon"
              :label="$t('Components.User.signup.password')"
              :rules="passwordRules"
              counter
              dense
              autocomplete="off"
              @click:append="showPassword = !showPassword"
              @keyup.enter.prevent="fireSubmit"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            ref="access"
            outlined
            class="ma-2 px-4"
            :loading="busy"
            @click.native.prevent="fireSubmit"
        >
          {{ $t("Components.User.signup.signup") }}
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn
            ref="google"
            outlined
            small
            class="ma-2 px-4"
            :loading="busy"
            @click.native.prevent="fireSubmit"
        >
          <v-icon left>$vuetify.icons.google</v-icon>
          {{ $t("Components.User.signup.google") }}
        </v-btn>
        <v-btn
            ref="facebook"
            outlined
            small
            class="ma-2 px-4"
            :loading="busy"
            @click.native.prevent="fireSubmit"
        >
          <v-icon left>$vuetify.icons.facebook</v-icon>
          {{ $t("Components.User.signup.facebook") }}
        </v-btn>
        <v-btn
            ref="linkedin"
            outlined
            small
            class="ma-2 px-4"
            :loading="busy"
            @click.native.prevent="fireSubmit"
        >
          <v-icon left>$vuetify.icons.linkedin</v-icon>
          {{ $t("Components.User.signup.linkedin") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "sign-up",
  inject: {
    signUp: {
      default: null
    }
  },
  data: () => ({
    form: {
      username: null,
      password: null
    },
    showPassword: false
  }),
  computed: {
    ...mapState(["busy"]),
    title() {
      return this.$t("Components.User.signup.title");
    },
    subtitle() {
      return this.$t("Components.User.signup.subtitle", [this.$t("App.title")]);
    },
    usernameRules() {
      return this.fieldValidator();
    },
    passwordRules() {
      return this.fieldValidator();
    },
    passwordTyped() {
      return this.form.password && this.form.password.trim().length > 0;
    },
    passwordType() {
      return this.passwordTyped && this.showPassword ? "text" : "password";
    },
    passwordIcon() {
      if (this.passwordTyped) {
        return `$vuetify.icons.${this.showPassword ? 'hide' : 'show'}Password`;
      }
      return null;
    },
    formValues() {
      return {
        username: this.form.username && this.form.username.trim(),
        password: this.form.username && this.form.password.trim()
      }
    }
  },
  mounted() {
    this.focusElement();
  },
  async beforeDestroy() {
    await this.resetForm();
  },
  methods: {
    async resetForm() {
      this.form.username = null;
      this.form.password = null;
    },
    async fireSubmit() {
      let valid = false;
      try {
        if (this.$refs.form) {
          valid = await this.$refs.form.validate();
        }
      } catch (e) {
        console.error("cannot validate form", e);
      }
      if (valid) {
        await this.signIn(this.formValues);
      }
    },
    async focusElement(el = "username") {
      await new Promise(resolve => setTimeout(resolve, 450));
      this.$refs[el].focus();
    },
    fieldValidator() {
      const vm = this;
      return [value => vm.requiredField(value)];
    },
    requiredField(value) {
      if (value && value.trim().length > 0) {
        return true;
      } else {
        return this.$t("Components.Validations.required");
      }
    }
  }
}
</script>
<style lang="scss">
.sign-up-container {
  display: grid;
  min-width: 100%;
  .v-form.signup-form {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    grid-row-gap: 8px;
  }
  .v-card__actions + .v-card__actions {
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: 1fr;
  }
  &:not(.mobile) {
    place-items: center;
    min-width: unset !important;
    .v-form.signup-form {
      grid-template-columns: minmax(385px, 25%) !important;
    }
  }
}
</style>
