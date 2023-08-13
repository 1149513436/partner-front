<template>
    <div class="main-body">
        <DynamicScroller :items="state.fakerArr" :min-item-size="200"
        @scroll="handleScroll"
        class="scroller">
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[
                    item.content,
                ]" :data-index="index">
                    <div class="avatar">
                        <img :src="item.img" alt="avatar" class="image" v-if="item.imgLoaded">
                        <div class="placeholder" v-else></div>
                    </div>
                   
                    <div class="text">{{ item.content }}</div>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
    </div>
</template>
  
<script setup>
import { ref, reactive, defineProps,onMounted,shallowReactive } from 'vue'
import faker from '@/utils/faker';
/* const props = defineProps({
    items: Array,
}); */
const state=shallowReactive({
    fakerArr:[],
    loadedImages:{}
});
const start=ref('')
const end=ref('')
onMounted(()=>{
    state.fakerArr=JSON.parse(faker()) ;
    // console.log("fakerArr",localStorage.getItem("fakerList"));
})

const handleScroll=(event)=>{
        start.value = event.start.value
        end.value = event.end.value
       preloadImages() // 预加载当前可见区域内的图片
      }

const preloadImages=()=>{
        // 预加载当前可见区域内的图片
        state.fakerArr.slice(start.value, end.value).forEach(item => {
          if (item.img && !item.imgLoaded) {
            const img = state.loadedImages[item.img]
            if (img) {
              item.imgLoaded = true
            } else if (img) {
              img.onload = () => {
                item.imgLoaded = true
              }
            }
          }
        })
      },
// console.log("666",props.items);
</script>
  
<style scoped lang="less">
.main-body {
    height: 800px;
    width: 600px;
    background-color: pink;

    .scroller {
        height: 100%;
        .avatar{
            img{
                width: 60px;
                height: 60px;
            }
        }
    }
}
</style>