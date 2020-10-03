<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <v-toolbar-title>{{ $t("App.title") }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'Airgyaan',
  data: () => ({
    //
  }),
};
</script>
