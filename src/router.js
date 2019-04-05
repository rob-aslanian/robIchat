import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Chat from "./views/Chat.vue";
import Admin from "./views/Admin.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: Home
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat,
      props: true,
      beforeEnter(to, from, next) {
        let cookie_name = document.cookie.split("=")[1];
        let name = to.params.name;
        name = cookie_name;

        if (name === undefined) next({ path: "/" });

        return name ? next() : next({ path: "/" });
      }
    },
    {
      path: "/chat/admin",
      name: "admin",
      component: Admin,
      beforeEnter(to, from, next) {
        let isAdmin = to.params.isAdmin;
        if (isAdmin === undefined || !isAdmin) next({ path: "/" });

        return next();
      }
    }
  ]
});
