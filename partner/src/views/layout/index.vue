<template>
    <div class="layout">
        <!-- 头部 -->
        <div class="head">
            <!-- logo区域 -->
            <div class="logo">
                <img src="@/assets/imgs/logo.png" alt="出错啦">
                <span style="margin-left:10px; font-size: 15px;color: #8ec5fc;">partner交友</span>
            </div>
            <!-- 菜单区域 -->
            <div class="menu">
                <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router style="border:none">
                    <el-menu-item index="/home">首页</el-menu-item>
                    <el-menu-item index="/im">聊天室</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>Workspace</template>
                        <el-menu-item index="2-1">item one</el-menu-item>
                        <el-menu-item index="2-2">item two</el-menu-item>
                        <el-menu-item index="2-3">item three</el-menu-item>
                        <el-sub-menu index="2-4">
                            <template #title>item four</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="3" disabled>Info</el-menu-item>
                    <el-menu-item index="4">Orders</el-menu-item>
                </el-menu>
            </div>
            <!-- 头像区域 -->
            <div class="user">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-avatar :src="store.loginInfo.user.avatar? store.loginInfo.user.avatar:defaultAvatar" :size="50"  />
                        <div style="margin-top:6px">
                            <span class="user-span" style="margin-left:15px">{{ store.loginInfo.user.name }}</span>
                           <!--  <el-icon class="el-icon--right">
                            <arrow-down />
                            </el-icon> -->
                        </div>
                        
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="router.push('/user?page=myInfo')"> 个人信息</el-dropdown-item>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            
                            <el-dropdown-item>
                                <div @click="logout">退出登录</div>
                                </el-dropdown-item>
                            
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <!-- main -->
        <div class="main">
            <router-view />
        </div>
    </div>

</template>

<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/user';
// 引入图标
import { ArrowDown } from '@element-plus/icons-vue'

import router from '@/router';


// 头像src
const defaultAvatar = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")
//小仓库
const store= useUserStore()
const user=store.loginInfo.user
//用户名
const username =user.name
// 退出登录
const logout=()=>{
    store.LOGOUT()
   router.push('/login')
 
   
}

</script>

<style scoped lang="less">
.layout {
    background-color: aliceblue;
    overflow: hidden;
    .head {
        display: flex;
        height: 60px;
        width: 100%;
        line-height: 60px;
        border-bottom: solid 1px #EDEDED;
        background-color: #FFFFFF;
       
        .logo {
            width: 200px;

            text-align: center;

            img {
                vertical-align: middle;
                width: 50px;
            }
        }

        .menu {
            flex: 1;

        }

        .user {
            // width: 200px;
          padding-right: 10px;
            .el-dropdown-link {
                cursor: pointer;
                color: var(--el-color-primary);
                display: flex;
                justify-content: space-around;
                line-height: 60px;
                position:relative; 
                top:5px;
               .el-icon--right{
               top: -5px;
               }
            }

            .user-span {
                font-size: 14px;
                position: relative;
                top: -10px
            }
        }
    }

    .main {
        width: 70%;
        min-height: calc(100vh - 80px);
        margin: 10px auto;
        background-color: azure;

    }
}
</style>
