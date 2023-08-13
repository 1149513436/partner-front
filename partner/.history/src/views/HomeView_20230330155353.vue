<template>
   <div class="">
    <!-- :items="state.temp" -->
        <ListItem ></ListItem> 
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
const state=reactive({
        temp:[]
});
onMounted(()=>{
    // load()
   
    /* for(let i=0;i<20000;i++){
        const obj=reactive({
            id:i,
            img:"https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            content:`你地nrsdc产商不错出版社在前端项目中经常需要一次渲染大量数据，然而大量数据就会生成大量dom，这样会造成浏览器卡顿，严重时还会卡死。这时候就需要用到虚拟列表了！！！
虚拟列表的原理很简单，就是只渲染可是区域内的元素，当你滚动页面时再去加载数据及dom。
为了用户体验一般会给列表留有一定的buffer（及上下多加载几个项目）当你滚动时就不会出现白屏现象了！
接下来给大家介绍一个非常好用的虚拟列表库----vue-virtual-scroller
作者：刻苦不刻骨
链接：https://juejin.cn/post/7126905394210816007
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。底部VN充电苏UVB四vn`
        });
        state.temp.push(obj)
    } */
    // console.log("temp",state.temp);
})
const load = () => {
    request.get("/dynamic/hot", {
        params: {
            pageNum: 1,
            pageSize: 100
        }
    }).then(res => {
        // console.log(res);
        state.temp = res.data.records;
        /* for(let i=0;i<100;i++){
            state.temp = state.temp.concat(state.temp)
        } */
        console.log("测试",state.temp);
    })
}
</script>
    

<style>
</style>
