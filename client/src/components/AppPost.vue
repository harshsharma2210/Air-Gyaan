<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form class="post-form pt-4" @submit.prevent="fireSubmit">
        <v-text-field
            ref="post"
            v-model="form.post"
            :label="$t('Components.Post.content')"
            :rules="postRules"
            counter
            dense
            @keyup.enter.prevent="fireSubmit"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          ref="cancel"
          outlined
          class="ma-2 px-4"
          @click.native.prevent="$emit('cancel-post')"
      >
        {{ $t("App.cancel") }}
      </v-btn>
      <v-btn
          ref="submit"
          outlined
          class="ma-2 px-4"
          :loading="busy"
          @click.native.prevent="fireSubmit"
      >
        {{ $t("Components.Post.post") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "app-post",
  props: {
    dialog: Boolean
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
      if (this.dialog) {
        return this.$t("Components.Post.title.new");
      }
      return this.$t("Components.Post.title.edit");
    },
    postRules() {
      return this.fieldValidator();
    },
    formValues() {
      return {
        post: this.form.post && this.form.post.trim()
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
      this.form.post = null;
    },
    async fireSubmit() {
      this.$emit("add-post", this.formValues);
    },
    async focusElement(initial = false, el = "post") {
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
.v-form.post-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  grid-row-gap: 8px;
}
</style>
