<template>
    <div class="main-body">
        <DynamicScroller :items="props.items" :min-item-size="200" class="scroller">
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[
                    item.content,
                ]" :data-index="index">
                    <div class="avatar">
                        <img :src="item.img" alt="avatar" class="image">
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
const props = defineProps({
    items: Array,
});
let fakerArr=[];
onMounted(()=>{
    fakerArr=faker;
    console.log("fakerArr",fakerArr);
})

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