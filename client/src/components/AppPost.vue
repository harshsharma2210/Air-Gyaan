<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-form ref="form" v-model="valid" lazy-validation class="post-form pt-4" @submit.prevent="">
        <v-text-field
            ref="title"
            v-model="form.title"
            :label="$t('Components.Post.form.title')"
            :rules="titleRules"
            counter="64"
            dense
            @keyup.enter.prevent="fireSubmit"
        ></v-text-field>
        <v-text-field
            ref="subtitle"
            v-model="form.subtitle"
            :label="$t('Components.Post.form.subtitle')"
            :rules="subtitleRules"
            counter="64"
            dense
            @keyup.enter.prevent="fireSubmit"
        ></v-text-field>
        <v-textarea
            ref="body"
            v-model="form.body"
            :label="$t('Components.Post.form.body')"
            :rules="bodyRules"
            counter="255"
            dense
            @keyup.ctrl.enter.prevent="fireSubmit"
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          ref="cancel"
          outlined
          class="ma-2 px-4"
          :disabled="busy"
          @click.native.prevent="$emit('cancel-post')"
      >
        {{ $t("App.cancel") }}
      </v-btn>
      <v-btn
          ref="submit"
          outlined
          class="ma-2 px-4"
          :loading="busy"
          :disabled="!enableAddPost && (busy || !valid)"
          @click.native.prevent="fireSubmit"
      >
        {{ $t("Components.Post.post") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "app-post",
  props: {
    dialog: Boolean,
    enableAddPost: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: true,
    form: {
      title: null,
      subtitle: null,
      body: null
    }
  }),
  computed: {
    ...mapState(["busy"]),
    title() {
      if (this.dialog) {
        return this.$t("Components.Post.title.new");
      }
      return this.$t("Components.Post.title.edit");
    },
    titleRules() {
      return this.titleValidator();
    },
    subtitleRules() {
      return this.subtitleValidator();
    },
    bodyRules() {
      return this.bodyValidator();
    },
    formValues() {
      if (this.form) {
        return {
          title: this.form.title && this.form.title.trim(),
          subtitle: this.form.subtitle && this.form.subtitle.trim(),
          body: this.form.body && this.form.body.trim()
        }
      }
      return null;
    }
  },
  mounted() {
    this.focusElement(true);
  },
  async beforeDestroy() {
    await this.resetForm();
  },
  methods: {
    ...mapActions(["configureBusy"]),
    async resetForm() {
      await this.$refs.form.reset();
    },
    async fireSubmit() {
      await this.configureBusy(true);
      const valid = this.$refs.form.validate();
      await this.$nextTick();
      if (valid) {
        this.$emit("add-post", this.formValues);
      } else {
        await this.configureBusy(false);
      }
    },
    async focusElement(initial = false, el = "title") {
      if (initial) {
        await new Promise(resolve => setTimeout(resolve, 450));
      } else {
        await this.$nextTick();
      }
      this.$refs[el].focus();
    },
    titleValidator() {
      const vm = this;
      return [value => vm.requiredField(value), () => vm.maxTextSize(vm.form.title, 64)];
    },
    subtitleValidator() {
      const vm = this;
      return [() => vm.maxTextSize(vm.form.subtitle, 64)];
    },
    bodyValidator() {
      const vm = this;
      return [value => vm.requiredField(value), () => vm.maxTextSize(vm.form.body, 255)];
    },
    requiredField(value) {
      if (value && value.trim().length > 0) {
        return true;
      } else {
        return this.$t("Components.Validations.required");
      }
    },
    maxTextSize(value, max) {
      // this validation MUST NOT check if value is required: that is, if empty is valid
      if (!value || max >= value.trim().length) {
        return true;
      } else {
        return this.$t("Components.Validations.max", [`${max}`]);
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
