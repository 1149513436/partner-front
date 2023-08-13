<template>
   <div class="">
        <ListItem :items="renderList"></ListItem>
   </div>
</template>

<script setup>

import { reactive,ref,onMounted,nextTick } from 'vue';
import ListItem from './ListItem.vue'

const renderList= reactive([
    {
        img:"https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        content:"你地产商不错出版社底部VN充电苏UVB四vn"
    }
]);
const temp=reactive([]);
onMounted(()=>{
   
    for(let i=0;i<200;i++){
        const obj=reactive({
            img:"https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            content:"你地产商不错出版社底部VN充电苏UVB四vn"
        });
        temp.push(obj)
       
       
    }
    nextTick(()=>{
        console.log("state.renderList",temp);
    })
       
    
})
</script>
    

<style>
</style>
