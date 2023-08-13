<template>
    <DynamicScroller
      :items="items"
      :min-item-size="54"
      class="scroller"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[
            item.message,
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
          <div class="text">{{ item.message }}</div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </template>
  
  <script>
  export default {
    props: {
      items: Array,
    },
  }
  </script>
  
  <style scoped>
  .scroller {
    height: 100%;
  }
  </style>