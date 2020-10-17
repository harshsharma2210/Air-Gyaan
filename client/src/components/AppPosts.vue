<template>
  <div :class="['posts-container', { mobile: $vuetify.breakpoint.mobile }]">
    <app-post-entry v-for="(post, idx) in posts" :key="`${idx}-${post._id}`" :post="post" />
    <infinite-loading @infinite="loadPosts" :distance="postsSize">
<!--      <template #noResults></template>-->
<!--      <template #noMore></template>-->
<!--      <template #error></template>-->
    </infinite-loading>
  </div>
</template>
<script>
import apiFetch from "@/mixins/apiFetch";

import AppPostEntry from "@/components/AppPostEntry";
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: "AppPosts",
  mixins: [apiFetch],
  components: { AppPostEntry, InfiniteLoading },
  props: {
    url: {
      type: String,
      default: "posts"
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
        const posts = await this.apiGet(this.url);
        if (posts.length > 0) {
          this.posts.push(...posts);
          state.loaded();
        } else {
          state.complete();
        }
      } catch (e) {
        console.error("Opps, something went wrong requesting posts", e);
        state.error();
      }
    }
  }
}
</script>
<style lang="scss">
.posts-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 16px;
  &.mobile {
    grid-row-gap: 8px;
  }
}
</style>
