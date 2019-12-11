import Vue from "vue";
import VueRouter from "vue-router";
import createworkout from "@/components/createWorkout";
import login from "@/components/login";
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: createworkout,
    beforeEnter: authGuard
  },
  {
    path: "/createworkout",
    name: "createworkout",
    component: createworkout,
    beforeEnter: authGuard
  },
  {
    path: "/login",
    name: "login",
    component: login
  }
];

const router = new VueRouter({
  routes
});

export default router;
