import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Assignment from "./views/Assignment.vue";
import Evaluate from "./views/Evaluate.vue";
import Result from "./views/Result.vue";
import store from "./store/store";

Vue.use(Router);

/**
 * This will check if a game is set or not.
 * If no game is set, navigate the user to the home screen.
 */
function noGameSet(to, from, next) {}

const router = new Router({
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
      path: "/result",
      name: "result",
      component: Result
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!store.state.game.isSet && to.name !== "home") {
    next("/");
    alert("Gib erst alle Spieleinstellungen ein!");
  }
  next();
});

export default router;
