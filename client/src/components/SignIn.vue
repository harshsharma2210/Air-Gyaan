<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-text-field
          ref="username"
          v-model="username"
          :label="$t('Components.User.signin.username')"
          :rules="[rules.required]"
          counter
          dense
          required
      ></v-text-field>
      <v-text-field
          ref="password"
          :type="!!password && showPassword ? 'text' : 'password'"
          v-model="password"
          :append-icon="!!password ? null : (showPassword ? '$vuetify.icons.hidePassword' : '$vuetify.icons.showPassword')"
          :label="$t('Components.User.signin.password')"
          :rules="[rules.required]"
          counter
          dense
          required
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <app-btn
          ref="access"
          outlined
          class="ma-2 px-4"
          :loading="busy"
          @click.native.prevent="fireSubmit"
      >
        {{ $t("Components.User.signin.signin") }}
      </app-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from "vuex";

import AppBtn from "@/components/AppBtn";

export default {
  name: "sign-in",
  components: { AppBtn },
  data: () => ({
    username: null,
    password: null,
    showPassword: false
  }),
  computed: {
    ...mapState(["busy"]),
    title() {
      return this.$t("Components.User.signin.title", [this.$t("App.title")]);
    },
    rules() {
      const message = this.$t("Components.Validations.required");
      return {
        required: value => !!value || message
      };
    }
  },
  mounted() {
    this.focusElement(true);
  },
  methods: {
    async fireSubmit() {
      this.$emit("signin",{
        username: this.username,
        password: this.password
      });
    },
    async focusElement(initial = false, el = "username") {
      if (initial) {
        await new Promise(resolve => setTimeout(resolve, 450));
      } else {
        await this.$nextTick();
      }
      this.$refs[el].focus();
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
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
}
</style>
