const SignUpView = () =>
  import(/* webpackChunkName: "sign-up-view" */ "@/views/SignUpView");
export default {
  name: "sign-up",
  path: "/sign-up",
  component: SignUpView,
  meta: {
    title: "Components.User.signup.title"
  }
}
