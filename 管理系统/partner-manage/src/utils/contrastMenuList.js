const modules = import.meta.glob('../views/*.vue')

import { defineAsyncComponent } from 'vue'

function initRoute(item){
    // 路由基本格式
  let route = {
    // 路由的路径
    path: item.path,
    // 路由名
    name: item.name,
    // 路由所在组件
    // component: (resolve) => require(['../views/'+item.page+'.vue'], resolve),
    component:()=>defineAsyncComponent(()=>import('../views/'+item.page+'.vue')),
    // component:()=>modules[`../views/${item.page}.vue`],
    // meta: {
    //   id: item.id,
    //   icon: item.icon
    // },
    // 路由的子路由
    children: []
  }
  // 返回 route
  return route
}


export function contrast(routers) { // 遍历后台传来的路由字符串，转换为组件对象
    console.log("routers",routers);
    const resultList=[]
    let route={}
    routers.forEach(item2 => {
      /*   if (item2.path) {
            resultList.push(initRoute(item2))
         }else{ */
            if (item2.children && item2.children.length>0) {
                route=initRoute(item2);
                route.children = contrast(item2.children)
                resultList.push(route)
            }else{//是目录但是下面没有子页面
              resultList.push(initRoute(item2))
            }
        //  }
    })
    console.log("result",resultList);
    return resultList
}