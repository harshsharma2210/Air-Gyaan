<template>
  <v-card class="post-entry-card" v-on="$listeners" v-bind="$attrs">
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-subtitle v-if="subtitlePresent">
      {{ post.subtitle }}
    </v-card-subtitle>
    <v-card-text>
      {{ post.body }}
    </v-card-text>
    <template v-if="actionsSlotPresent">
      <v-card-actions>
        <slot name="actions" v-bind="post" />
      </v-card-actions>
    </template>
  </v-card>
</template>
<script>
export default {
  name: "AppPostEntry",
  inheritAttrs: false,
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    subtitlePresent() {
      return this.post && !!this.post.subtitle;
    },
    actionsSlotPresent() {
      return !!this.$slots.actions;
    }
  }
}
</script>
<style lang="scss">
.v-card.post-entry-card {
  border-radius: 16px !important;
}
</style>
