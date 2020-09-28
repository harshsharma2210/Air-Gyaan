
import Vue from 'vue';
import VueRouter from "vue-router";
import post from "@/components/post";
import postComponent from "@/components/Main/postComponent";
import profile from "@/components/User/profile";
import new_post from "@/components/new_post";
import login_signup from "@/components/login_signup"

Vue.use(VueRouter);


export default new VueRouter({
    routes: [
        { path: "/", name: 'Hello', component: post },
        { path: "/post", component: postComponent },
        { path: "/profile", component: profile },
        { path: "/new_post", component: new_post},
        { path: "/login_signup", component: login_signup}

    ],
    mode: "history",
});
