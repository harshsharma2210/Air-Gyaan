<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="title font-weight-high">Air Gyaan (logo)</span>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation
        color="primary"
        app
      >
        <v-btn to="/">
          <span>Recents</span>
          <v-icon>mdi-history</v-icon>
        </v-btn>
  
        <v-btn to="/explore">
          <span>Explore</span>
          <v-icon>mdi-search-web</v-icon>
        </v-btn>
  
        <!-- <v-btn to="/nearby">
          <span>Nearby</span>
          <v-icon>mdi-map-marker</v-icon>
        </v-btn> -->

         <v-btn to="/profile">
          <span>User</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
  </v-app>
</template>

<script>

export default {
  name: 'Airgyaan',
  data: () => ({
    //
    activeBtn:0,
    showNav:true
  }),
};
</script>
