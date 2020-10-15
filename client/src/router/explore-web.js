const ExploreWebView = () =>
  import(/* webpackChunkName: "explore-web-view" */ "@/views/ExploreWebView");
export default {
  name: "explore-web",
  path: "explore-web",
  component: ExploreWebView
}
