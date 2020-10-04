<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-theme-provider>
      <default-layout />
    </v-theme-provider>
  </v-app>
</template>

<script>
export default {
  name: 'Airgyaan',
  components: {
    DefaultLayout: () => import(/* webpackChunkName: "layout-dependencies" */ "@/components/DefaultLayout")
  }
};
</script>
