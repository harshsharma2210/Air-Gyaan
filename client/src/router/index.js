
import Vue from 'vue';
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import post from "@/components/Main/post";

Vue.use(VueRouter);


export default new VueRouter({
    routes: [
        { path: "/",name:'Hello',component: HelloWorld },
        { path: "/post", component: post }

    ],
    mode: "history",
});
