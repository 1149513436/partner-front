<template>
    <div class="">
        <!-- 
      导航路径：
        [{home},{goods:,children:[{},{},..]},{order,children:[{},{}]}]
      思路：
        1. 遍历获取的导航路由信息 
        2. 渲染的时候需要判断当前的导航路径是否由children 
          有children 长度>0 说明有二级或者多级导航 
          没有children属性  说明一级导航

     -->
        <template v-for="(item, index) in props.menulist">
            <!-- 使用name属性跳转，因为index中路径不完整  -->
            <el-sub-menu :index="item.path" :key="index" v-if="(item.children && item.children.length > 0)">
                <template #title>
                    <i class="el-icon-s-cooperation"></i>
                    <span >{{ item.name }}</span>
                </template>
                <el-menu-item-group>
                    <!-- 渲染二级导航 需要循环遍历  注意：递归组件,实现二层或者三层子菜单   -->
                    <MenuList :menulist="item.children"></MenuList>
                </el-menu-item-group>
            </el-sub-menu>
              <!-- @click="tiao(item.path)" -->
            <el-menu-item :index="item.path" :key="(index + 100)" 
                v-else  v-show="!item.hide" >
                <i class="el-icon-menu"></i>
                <span >{{ item.name }}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script setup>

import router from '@/router/index.js'
import { defineProps } from 'vue'
const props = defineProps({
    menulist: {
      type: Array,
      default: () => []
    }
  })
 console.log("dongdongd", props.menulist);
     const tiao=(name)=>{
            console.log("66",router);
          router.push(name)
        }
    

</script>

<style>

</style>
