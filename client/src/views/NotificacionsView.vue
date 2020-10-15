<template>
  <v-container>
    <v-row class="text-center" >
      <p>{{ $t("Views.Notifications.title") }}</p>
    </v-row>
    <v-row class="text-center" >
      <router-link to="/">{{ $t("Views.Notifications.back-home") }}</router-link>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'notifications-view',

  data: () => ({}),
}
</script>
