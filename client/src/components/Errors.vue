<template>
  <v-card>
    <v-card-title>{{ $t(title) }}</v-card-title>
    <v-card-text>
      <ul class="errors" role="presentation">
        <li v-for="(error, i) in errors" :key="i">
          <span aria-hidden="true">
            <v-icon color="error">$vuetify.icons.error</v-icon>
          </span>
          <span class="message-error">{{ $t(error) }}</span>
        </li>
      </ul>
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

