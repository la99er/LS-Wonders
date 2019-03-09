import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Assignment from "./views/Assignment.vue";
import Evaluate from "./views/Evaluate.vue";
import Result from "./views/Result.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/assign",
      name: "assign",
      component: Assignment
    },
    {
      path: "/evaluate",
      name: "evaluate",
      component: Evaluate
    },
    {
      path: "/results",
      name: 'results',
      component: Result
    }
  ]
});
