<template>
   <div class="">
        <ListItem :items="temp"></ListItem>
   </div>
</template>

<script setup>

import { reactive,ref,onMounted,nextTick } from 'vue';
import ListItem from './ListItem.vue'
import request from '../utils/request';
const renderList= reactive([
    {
        img:"https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        content:"你地产商不错出版社底部VN充电苏UVB四vn"
    }
]);
const temp=reactive([]);
onMounted(()=>{
    load()
    /* for(let i=0;i<200;i++){
        const obj=reactive({
            id:i,
            img:"https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            content:"你地产商不错出版社底部VN充电苏UVB四vn"
        });
        temp.push(obj)
    } */
})
const load = () => {
    request.get("/dynamic/hot", {
        params: {
            pageNum: 1,
            pageSize: 5
        }
    }).then(res => {
        // console.log(res);
        temp = res.data.records;
        console.log("测试",temp);
    })
}
</script>
    

<style>
</style>
