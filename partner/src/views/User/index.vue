<template>
    <div class="container">
        <!-- 侧边栏 -->
        <div class="aside">
            <ul>
                <li @click="changePagePath('myInfo')"><el-icon class="menu-icon:page=='myInfo' "><User /></el-icon>个人资料</li>
                <li  @click="changePagePath('myPassword')"><el-icon class="menu-icon" :class="{'menu-active':page==='myPassword'}"><Lock /></el-icon>修改密码</li>
                <li  @click="changePagePath('myMessage')"><el-icon class="menu-icon" :class="{'menu-active':page=='myMessage'}"><Message /></el-icon>消息提醒</li>
                <li  @click="changePagePath('myDynamic')"><el-icon class="menu-icon" :class="{'menu-active':page=='myDynamic'}"><Histogram /></el-icon>我的动态</li>
            </ul>
        </div>
        <!-- main -->
        <div class="main">
            <MyInfoVue v-if="page==='myInfo'"/>
            <MyDynamic v-if="page==='myDynamic'"/>
        </div>
      
    </div>
</template>

<script setup>
import { inject, onMounted, reactive,ref } from 'vue';
import { useCenterStore } from '@/stores/center'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus';
import { Plus,User,Message,Histogram, Lock } from '@element-plus/icons-vue'
import MyInfoVue from './MyInfo.vue';
import MyDynamic from './MyDynamic.vue'
import { useRoute } from 'vue-router';
import router from '@/router';
// 需要包一层，不然无法直接复制
const route=useRoute()
let page=route.query.page
console.log("page为",page);
//接收APP组件的方法，Vue3新增的一种组件通信方式
const reload=inject('load')
const changePagePath=(path)=>{
    console.log(66);
    //修改参数值
    router.push({query:{page:path}})
    route.query.page=path
    reload()
}

</script>

<style scoped lang="less">
.container {
    display: flex;
    background-color: white;
    min-height: calc(100vh - 80px);
    background-color: aliceblue;

    .aside {
        width: 200px;
        background-color: white;
        margin-right: 15px;

        ul li {
            line-height: 50px;
            text-align: center;
            cursor: pointer;
        }
        .menu-icon{
            margin-right: 5px;
            top:2px
        }
        .menu-active{
            color: dodgerblue;
        }
    }
    .main{
        flex: 1;
    }

}
</style>
