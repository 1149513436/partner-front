import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login/index.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register/index.vue"),
    },
    {
      path: "/404",
      name: "404",
      component: () => import("../views/error/index.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  //没有匹配到
  const store = useUserStore(); // 拿到用户对象信息
  const user = store.user;
  const hasUser = user.id && user;
  if(to.path=='/register'){
    console.log("diyici");
    next()
    console.log("dierci");
  }
  else if (!hasUser && to.path !== '/login') {
    //必须加判断，因为如果当前页面就是login，但是没有用户信息
    //那就会造成多次重定向
    console.log("disanci");
    next("/login");
  } else {
    next();
  }
});

export default router;
