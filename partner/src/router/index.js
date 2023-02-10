import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: () => import("../views/layout/index.vue"),
      redirect:'/home',
      children:[
        {
        path: "home",
        name: "home",
        component: () => import("../views/HomeView.vue"),
      },
       {
        path: "user",
        name: "User",
        component: () => import("../views/User/index.vue"),
      },
      ]
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
    {
      path:'/:pathMatch(.*)',//vue3匹配404规则
      redirect:'/404'
    }
  ],
});

router.beforeEach((to, from, next) => {
  //没有匹配到
  const store = useUserStore(); // 拿到用户对象信息
  const user = store.loginInfo.user;
  console.log(store);
  const hasUser = user && user.id;  //先user后user.id。因为如果先user.id如果user为undefined就报错
  console.log("hasuser",hasUser);
  if(to.path=='/register'||to.path=='/login'){
    // console.log("diyici");
    console.log("66");
    next()
    // console.log("dierci");
  }
  else if (!hasUser && to.path !== '/login') {
    //必须加判断，因为如果当前页面就是login，但是没有用户信息
    //那就会造成多次重定向
    // console.log("disanci");
    next("/login");
  } else {
    next();
  }
});

export default router;
