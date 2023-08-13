<template>
    <div class="main-body">
           <DynamicScroller
      :items="props.items"
      :min-item-size="54"
      class="scroller"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[
            item.content,
          ]"
          :data-index="index"
        >
          <div class="avatar">
            <img
              :src="item.avatar"
              :key="item.avatar"
              alt="avatar"
              class="image"
            >
          </div>
          <div class="text">{{ item.content }}</div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
    </div>
 
  </template>
  
  <script setup>
import {ref,reactive,defineProps} from 'vue'
   const props=defineProps({
      items: Array,
    }) ;
  
  </script>
  
  <style scoped lang="less">
  .main-body{
    height: 800px;
    width: 600px;
    background-color: pink;
     .scroller {
        height: 100%;
      }
  }
 
  </style>