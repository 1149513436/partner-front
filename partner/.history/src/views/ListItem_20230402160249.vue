<template>
    <div class="main-body">
        <DynamicScroller :items="state.fakerArr" :minItemSize="60"
        @scroll="handleScroll" :buffer="200"
        class="scroller">
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[
                    item.content,
                ]" :data-index="index">
                    <div class="avatar">
                        <img :src="item.img" alt="avatar" class="image" >
                      
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
/* const start=ref('')
const end=ref('') */
onMounted(()=>{
    state.fakerArr=JSON.parse(faker()) ;
    // console.log("fakerArr",localStorage.getItem("fakerList"));
})



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