import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/stores/user";
import { contrast } from '../utils/contrastMenuList';
const modules = import.meta.glob('../views/*.vue')
const layoutModules = import.meta.glob('../layout/index.vue')
import { defineAsyncComponent } from 'vue'
// const store=useUserStore()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/index.vue')
      // component:Login
    },
  /*  {
      path: '/',
      name: 'layout',
      component:()=>import('@/layout/index.vue'),
      redirect:'/home',
      children:[
        {
          path:'home',
          name:'Home',
          component:()=>import('@/views/HomeView.vue')
        }, */
       /*   {
          path:'user',
          name:'User',
          component:()=>import('@/views/User.vue')
        },
        {
          path:'dynamic',
          name:'Dynamic',
          component:()=>import('@/views/dynamic.vue')
        },
        {
          path:'role',
          name:'Role',
          component:()=>import('@/views/Role.vue')
        },
        {
          path:'permission',
          name:'Permission',
          component:()=>import('@/views/Permission.vue')
        }*/
      // ] 
    // }, 
  
  ]
})

//设置动态路由
// 注意：刷新页面会导致页面路由重置
export const setRoutes = (temp) => {
  if(!temp || !temp.length){
    console.log("登录之后");
    const manager = localStorage.getItem('manager')//读取本地存储
    if (!manager) {
      return
    }
    temp =JSON.parse(manager).managerInfo.menus
  }
 
 
   

  console.log("得到的动态路由",temp);
  //name: 'Layout',
  let layoutRoute = { 
    path: '/', 
    name: 'Layout', 
    component:layoutModules['../layout/index.vue'],
     redirect:'/home',
  children: [
    { path: 'home', name: 'Home',  component:modules['../views/HomeView.vue']}
  ]
}
  if (temp.length) {
    // 拼装动态路由
    let resultMenu= contrast(JSON.parse(JSON.stringify(temp)));
    layoutRoute.children=layoutRoute.children.concat(resultMenu);
    console.log("最终",layoutRoute);

console.log("当前已有路由",router.getRoutes());
    // 获取当前的路由对象名称数组
    const currentRouteNames = router.getRoutes().map(v => v.name);
    console.log("获取当前的路由对象名称数组",currentRouteNames);
    if (!currentRouteNames.includes('Layout')) {
      // 动态添加到现在的路由对象中去
      // layoutRoute.children.forEach(item=>{
      //   router.addRoute(layoutRoute.children);
      // })
      router.addRoute(layoutRoute)
      // router.options.routes.push(layoutRoute.children)
    }
  }
}

setRoutes()

// 路由守卫
router.beforeEach((to, from, next) => {
  const store = useUserStore()  // 拿到用户对象信息
  const user = store.managerInfo.user
  const hasUser = user && user.id
  const noPermissionPaths = ['/login']   // 定义无需登录的路由
  if (!hasUser && !noPermissionPaths.includes(to.path)) {  // 用户没登录,  假如你当前跳转login页面，然后login页面没有用户信息，这个时候你再去往 login页面跳转，就会发生无限循环跳转
    // 获取缓存的用户数据
    //  如果to.path === '/login' 的时候   !noPermissionPaths.includes(to.path) 是返回 false的，也就不会进 next("/login")
    
    next("/login")
  } else {
    next()
  }
})

export default router
