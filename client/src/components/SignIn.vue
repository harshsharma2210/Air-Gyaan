<template>
  <div :class="['sign-in-container', { mobile: $vuetify.breakpoint.xsOnly }]">
    <v-card class="elevation-0 border-0">
      <v-card-title class="justify-center">{{ title }}</v-card-title>
      <v-card-text>
        <v-form ref="form" class="signin-form pt-4" @submit.prevent="fireSubmit"  lazy-validation>
          <v-text-field
              ref="username"
              v-model="form.username"
              :label="$t('Components.User.signin.username')"
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
              :label="$t('Components.User.signin.password')"
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
          {{ $t("Components.User.signin.signin") }}
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn
            ref="google"
            outlined
            small
            class="ma-2 px-4"
            :loading="busy"
            :disabled="disabledGapi"
        >
          <v-icon left>$vuetify.icons.google</v-icon>
          {{ $t("Components.User.signin.google") }}
        </v-btn>
        <v-btn
            ref="facebook"
            outlined
            small
            class="ma-2 px-4"
            :loading="busy"
            :disabled="disabledFapi"
        >
          <v-icon left>$vuetify.icons.facebook</v-icon>
          {{ $t("Components.User.signin.facebook") }}
        </v-btn>
        <v-btn
            ref="linkedin"
            outlined
            small
            class="ma-2 px-4"
            :loading="busy"
            :disabled="disabledLapi"
            :href="lurl"
        >
          <v-icon left>$vuetify.icons.linkedin</v-icon>
          {{ $t("Components.User.signin.linkedin") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import socialLoader from "@/mixins/socialLoader";

export default {
  name: "sign-in",
  mixins: [socialLoader],
  inject: {
    signIn: {
      default: null
    }
  },
  data: () => ({
    activateValidation: false,
    form: {
      username: null,
      password: null
    },
    showPassword: false
  }),
  computed: {
    ...mapState(["busy"]),
    title() {
      return this.$t("Components.User.signin.card-title", [this.$t("App.title")]);
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
    this.focusElement(true);
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
    async focusElement(initial = false, el = "username") {
      if (initial) {
        await new Promise(resolve => setTimeout(resolve, 450));
      } else {
        await this.$nextTick();
      }
      try {
        this.$refs[el].focus();
      } catch (_) {
        // just ignore
      }
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
.sign-in-container {
  display: grid;
  min-width: 100%;
  .v-form.signin-form {
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
    .v-form.signin-form {
      grid-template-columns: minmax(385px, 25%) !important;
    }
  }
}
</style>
