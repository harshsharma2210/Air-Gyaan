
import Vue from 'vue';
import VueRouter from "vue-router";
import post from "@/components/post";
import postComponent from "@/components/Main/postComponent";
import profile from "@/components/User/profile";

Vue.use(VueRouter);


export default new VueRouter({
    routes: [
        { path: "/", name: 'Hello', component: post },
        { path: "/post", component: postComponent },
        { path: "/profile", component: profile }

    ],
    mode: "history",
});
