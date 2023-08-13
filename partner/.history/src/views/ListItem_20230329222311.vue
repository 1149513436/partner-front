<template>
    <DynamicScroller
      :items="items"
      :min-item-size="200"
      class="scroller">
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.content]"
          :data-index="index">
          <div class="avatar">
           
            <p class="text">
                <!-- 其实在这里只要显示描述就好了，内容到正式界面中去显示 -->
                {{ item.content }}
            </p>
            <el-row :gutter="10">
                <el-col :span="7" v-for="el in randArray2(1, 5)">
                    <img style="width: 100%" :src="item.img" alt="" />
                </el-col>
            </el-row>
            
          </div>
          <div class="text">{{ item.message }}</div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </template>
  <script setup>
 import { defineProps } from 'vue'
   const props= defineProps({
      items: Array,
    });
  
  </script>
  <style scoped lang="less">
  .scroller {
    height: 100%;
    .avatar{
        img{
            width: 50px;
            height: 50px;
        }
    }
  }
  </style>
