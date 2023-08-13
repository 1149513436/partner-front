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
            <img
              :src="item.img"
              :key="item.img"
              alt="avatar"
              class="image">
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
        .image{
            width: 50px;
        }
    }
  }
  </style>
