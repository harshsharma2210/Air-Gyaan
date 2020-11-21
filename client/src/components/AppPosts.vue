<template>
  <div :class="['posts-container', { mobile: $vuetify.breakpoint.mobile }]">
    <app-post-entry v-for="(post, idx) in posts" :key="`${idx}-${post._id}`" :post="post" />
    <infinite-loading @infinite="loadPosts" :distance="postsSize">
      <template #noResults>
        <div class="text-centered">{{ $t("Components.Post.posts.no-results") }}</div>
      </template>
      <template #noMore>
        <div class="text-centered">{{ $t("Components.Post.posts.no-more") }}</div>
      </template>
      <template #error>
        <div class="post-error">
          <div>{{ $t("Components.Post.posts.error") }}</div>
          <v-btn small outlined color="error">{{ $t("Components.Post.posts.retry") }}</v-btn>
        </div>
      </template>
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
  .post-error {
    display: block;
    text-align: center;
    .v-btn, div {
      margin-top: 8px;
      font-weight: 700;
      color: var(--v-error-base);
      caret-color: var(--v-error-base);
    }
  }
  .text-centered {
    display: block;
    text-align: center;
    margin: 8px 0;
    font-weight: 700;
  }
}
</style>
