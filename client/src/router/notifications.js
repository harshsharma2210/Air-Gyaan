const NotificacionsView = () =>
  import(/* webpackChunkName: "notifications-view" */ "@/views/NotificacionsView");
export default {
  name: "notifications",
  path: "/notifications",
  component: NotificacionsView,
  meta: {
    requiresAuth: true
  }
}
