<template>
  <v-app>
    <v-theme-provider root>
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
