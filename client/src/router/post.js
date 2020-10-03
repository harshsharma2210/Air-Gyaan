const PostView = () =>
  import(/* webpackChunkName: "post-view" */ "@/views/PostView");
export default {
  name: "post",
  path: "post",
  component: PostView
}
