<template>
  <v-container>
    <v-row class="text-center" >
      <p>{{ $t("Views.Post.title") }}</p>
    </v-row>
    <v-row class="text-center" >
      <router-link to="/">{{ $t("Views.Post.back-home") }}</router-link>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'post-view',

  data: () => ({}),
}
</script>
