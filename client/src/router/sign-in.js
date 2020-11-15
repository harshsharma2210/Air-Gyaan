const SignInView = () =>
  import(/* webpackChunkName: "sign-in-view" */ "@/views/SignInView");
export default {
  name: "sign-in",
  path: "sign-in",
  component: SignInView,
  meta: {
    title: "Components.User.signin.title"
  }
}
