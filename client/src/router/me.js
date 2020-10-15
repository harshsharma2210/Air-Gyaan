const MeView = () =>
  import(/* webpackChunkName: "me-view" */ "@/views/MeView");
export default {
  name: "me",
  path: "me",
  component: MeView
}
