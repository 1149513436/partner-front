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

onMounted(()=>{
    const temp=reactive([]);
    for(let i=0;i<200;i++){
        let obj;
        if(i%2==0){
           obj={
            img:"https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            content:"你地产商不错出版社底部VN充电苏UVB四vn"
           }
           renderList.push[obj]
        }else{
            obj={
            img:"https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            content:"你地产商不bui对此事看不出veocbnjcs欧我觉得吧ds大V双方都不够吧j错出版社底部VN充电苏UVB四vn"
           }
           temp.push[obj]
        }
        console.log(temp);
       
    }
    nextTick(()=>{
        console.log("state.renderList",renderList);
    })
       
    
})
</script>
    

<style>
</style>
