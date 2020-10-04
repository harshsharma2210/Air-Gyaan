<template>
  <v-btn color="accent" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </v-btn>
</template>
<script>
export default {
  name: "app-btn",
  inheritAttrs: false
}
</script>
