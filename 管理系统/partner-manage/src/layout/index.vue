<script setup>
import {RouterView} from 'vue-router'
import router from '@/router'
// import {
//   Document,
//   Menu as IconMenu,
//   Location,
//   Setting
// } from '@element-plus/icons-vue'
import {useUserStore} from "@/stores/user";
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import menuList from './menuList.vue';

const userStore = useUserStore()
const user = userStore.getUser
const menus = userStore.getMenus()
console.log(menus);
const logout = () => {
  request.get('/logout/' + user.uid).then(res => {
    if (res.code === '200') {
      userStore.logout()
    } else {
      ElMessage.error(res.msg)
    }
  })

}
</script>

<template>
  <!-- 头部 -->
  <div style="height:60px;border-bottom: 1px solid #ccc;background-color: aliceblue;">
    <div style="display:flex">
      <div style="width:200px;color:deepskyblue;font-size:24px;text-align:center">后台管理</div>
      <div style="flex:1;display:flex">
      <div style="flex:1">
        头部
      </div>

      <!-- 头像 -->
      <div style="width:200px;text-align: center;padding: right 10px;"> 
        <div style="width: 200px; text-align: right; padding-right: 20px">
            <el-dropdown>
              <el-avatar :size="40" :src="user.avatar" style="margin-top: 10px" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item><div @click="router.push('/person')">个人信息</div></el-dropdown-item>
                  <el-dropdown-item><div @click="router.push('/password')">修改密码</div></el-dropdown-item>
                  <el-dropdown-item><div @click="logout">退出登录</div></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </div>
      </div>
    </div>
    </div>
    
  </div>
  <!-- 侧边栏和主题 -->
  <div style="display:flex;overflow:overlay;">
    <div style="min-height: calc(100vh - 60px);border-right: 1px solid #ccc;width: 200px;">
      <el-menu
            :default-active="'home'"
            :default-openeds="['/permission']"
            class="el-menu-demo"
            style="border: none"
            router
        >
        <!-- <div v-for="item in menus" :key="item.id">
          <div v-if="item.type === 2">
            <el-menu-item :index="item.path" v-if="!item.hide">
              <el-icon v-if="item.icon">
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </div>
          <div v-else>
            <el-sub-menu :index="item.id + ''" v-if="!item.hide">
              <template #title>
                <el-icon v-if="item.icon">
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <div  v-for="subItem in item.children" :key="subItem.id">
                <el-menu-item :index="subItem.path" v-if="!subItem.hide">
                  <template #title>
                    <el-icon v-if="subItem.icon">
                      <component :is="subItem.icon"></component>
                    </el-icon>
                    <span>{{ subItem.name }}</span>
                  </template>
                </el-menu-item>
              </div>
            </el-sub-menu>
          </div>
        </div> -->
       <menuList :menulist="menus"/>
      </el-menu>
    </div>
    <!-- 主题 -->
    <div style="flex:1">
        <RouterView/>
    </div>
  </div>

</template>
