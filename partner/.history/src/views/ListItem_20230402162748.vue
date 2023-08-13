<template>
    <div class="main-body">
        <DynamicScroller :items="state.fakerArr" :min-item-size="60"
         :buffer="800"
        class="scroller">
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[
                    item.content,
                ]" :data-index="index">
                    <div class="avatar">
                        <img :src="item.img" v-if="shouldLoad(index)" alt="avatar" class="image" @load="onImageLoad(index)">
                      
                    </div>
                   
                    <div class="text">{{ item.content }}</div>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
    </div>
</template>
  
<script setup>
import { ref, reactive,getCurrentInstance , defineProps,onMounted,shallowReactive,nextTick} from 'vue'
import faker from '@/utils/faker';
/* const props = defineProps({
    items: Array,
}); */
const state=shallowReactive({
    fakerArr:[],

    loadedImages: new Set()
});

onMounted(()=>{
    state.fakerArr=JSON.parse(faker());
    // console.log("fakerArr",localStorage.getItem("fakerList"));
    nextTick(() => {
        const options = {
          root: getCurrentInstance(),
          rootMargin: '50px',
          threshold: 0.5
        }
        console.log("option",options.root);
        const observer = new IntersectionObserver(handleIntersection, options)
        const imgElements = document.querySelectorAll('img')
        console.log("所有图片",imgElements);
        imgElements.forEach((el) => {
          observer.observe(el)
        })
      })
})

const shouldLoad=(index)=>{
        const item = state.fakerArr[index]
        return !state.loadedImages.has(item.src)
      }
const handleIntersection=(entries, observer)=>{
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgElement = entry.target
            // imgElement.src = imgElement.img
            console.log("imgElement",imgElement);
            observer.unobserve(imgElement)
          }
        })
      }

 const onImageLoad=(index)=>{
        const item = state.fakerArr[index]
        state.loadedImages.add(item.src)
      }
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