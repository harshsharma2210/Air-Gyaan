<template>
  <v-container fluid>
    <v-row v-for="(post,index) in posts" :key="index">
      <postComponent class="ma-3 pa-0" :content="post"></postComponent>
    </v-row>
  </v-container>
</template>

<script>
import postComponent from "@/components/Main/postComponent";
export default {
  name: "HelloWorld",
  components: {
    postComponent,
  },
  data: () => ({
    posts: [
      {
        name: "content-1",
        text: "content",
        category: "category",
        createdBy: {
          name: "name of creator",
          profile: "link for profile picture",
        },
        info: { like: 23, share: 345 },
      },
      {
        name: "content-2",
        text: "content",
        category: "category",
        createdBy: {
          name: "name of creator",
          profile: "link for profile picture",
        },
        info: { like: 234, share: 345 },
      },
      {
        name: "content-3",
        text: "content",
        category: "category",
        createdBy: {
          name: "name of creator",
          profile: "link for profile picture",
        },
        info: { like: 2389, share: 345 },
      },
      {
        name: "content-4",
        text: "content",
        category: "category",
        createdBy: {
          name: "name of creator",
          profile: "link for profile picture",
        },
        info: { like: 234, share: 345 },
      },
    ],
  }),
};
</script>
