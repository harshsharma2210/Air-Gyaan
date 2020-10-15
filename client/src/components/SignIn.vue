<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form class="signin-form pt-4" @submit.prevent="fireSubmit">
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
  </v-card>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "sign-in",
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
      return this.$t("Components.User.signin.title", [this.$t("App.title")]);
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
      this.$emit("signin", this.formValues);
    },
    async focusElement(initial = false, el = "username") {
      if (initial) {
        await new Promise(resolve => setTimeout(resolve, 450));
      } else {
        await this.$nextTick();
      }
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
.v-form.signin-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  grid-row-gap: 8px;
}
</style>
