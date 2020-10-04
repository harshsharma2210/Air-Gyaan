const NotificacionsView = () =>
  import(/* webpackChunkName: "me-view" */ "@/views/NotificacionsView");
export default {
  name: "notifications",
  path: "notifications",
  component: NotificacionsView
}
