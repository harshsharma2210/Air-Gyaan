<template>
  <div class="posts-container">
    <app-post-entry v-for="(post, idx) in posts" :key="`${idx}-${post._id}`" :post="post" />
    <infinite-loading @infinite="loadPosts" :distance="postsSize">
<!--      <template #noResults></template>-->
<!--      <template #noMore></template>-->
<!--      <template #error></template>-->
    </infinite-loading>
  </div>
</template>
<script>
import AppPostEntry from "@/components/AppPostEntry";
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: "AppPosts",
  components: { AppPostEntry, InfiniteLoading },
  props: {
    url: {
      type: String,
      default: "/posts"
    },
    postsSize: {
      type: Number,
      default: 10
    }
  },
  data: () => ({
    posts: []
  }),
  methods: {
    async loadPosts(state) {
      try {
        const response = await fetch(this.url);
        const posts = await response.json();
        if (posts.length > 0) {
          this.posts.push(...posts);
          state.loaded();
        } else {
          state.complete();
        }
      } catch (e) {
        state.error();
      }
    }
  }
}
</script>
<style lang="scss">
.posts-container {
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 8px;
}
</style>
