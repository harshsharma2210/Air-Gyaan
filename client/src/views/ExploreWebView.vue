<template>
  <v-container>
    <v-row class="text-center" >
      <p>{{ $t("Views.ExploreWeb.title") }}</p>
    </v-row>
    <v-row class="text-center" >
      <router-link to="/">{{ $t("Views.ExploreWeb.back-home") }}</router-link>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'explore-web-view',

  data: () => ({}),
}
</script>
