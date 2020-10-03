import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/views/HomeView";

// this will only load top level routes
const requireRoutes = require.context("./", false, /\.js$/);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView
    }
];

const verify = process.env.NODE_ENV !== "production";
let entry;
if (verify) {
    const routeMap = new Map();
    for (const file of requireRoutes.keys()) {
        if (file === "./index.js") {
            continue;
        }
        if (verify) {
            console.info(`Router-Index: ${file}`);
        }
        entry = requireRoutes(file).default;
        if (Array.isArray(entry)) {
            entry.forEach(e => {
                if (routeMap.get(e.name)) {
                    throw new Error(
                      `there is another route registered for ${e.name}: current path "${
                        e.path
                      }" and existing path ${routeMap.get(e.name)}`
                    );
                } else {
                    routeMap.set(entry.name, entry.path);
                }
            });
            routes.push(...entry);
        } else {
            if (routeMap.get(entry.name)) {
                throw new Error(
                  `there is another route registered for ${entry.name}: current path "${
                    entry.path
                  }" and existing path ${routeMap.get(entry.name)}`
                );
            } else {
                routeMap.set(entry.name, entry.path);
            }
            routes.push(entry);
        }
    }
    routeMap.clear();
} else {
    for (const file of requireRoutes.keys()) {
        if (file === "./index.js") {
            continue;
        }
        entry = requireRoutes(file).default;
        if (Array.isArray(entry)) {
            routes.push(...entry);
        } else {
            routes.push(entry);
        }
    }
}

Vue.use(Router);

export default new Router({
    mode: history,
    routes
});

