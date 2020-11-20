<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>

    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          ref="cancel"
          outlined
          class="ma-2 px-4"
          @click.native.prevent="$emit('cancel-errors')"
      >
        {{ $t("App.ok") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
  name: "errors",
  props: {
    title: {
      type: String,
      required: true
    },
    errors: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

