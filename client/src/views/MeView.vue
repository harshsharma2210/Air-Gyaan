<template>
  <v-container>
    <v-row class="text-center" >
      <p>{{ $t("Views.Me.title") }}</p>
    </v-row>
    <v-row class="text-center" >
      <router-link to="/">{{ $t("Views.Me.back-home") }}</router-link>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'me-view',

  data: () => ({}),
}
</script>
