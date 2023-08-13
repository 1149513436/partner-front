<template>
    <div class="main-body" ref="list">
        <DynamicScroller :items="state.fakerArr" @scroll="handleScrollThrottled" :min-item-size="60" class="scroller">
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[
                    item.content,
                ]" :data-index="index">
                    <div class="avatar">
                        <img :data-src="item.img" v-if="shouldLoad(index)" alt="avatar" class="image" @load="onImageLoad(index)">

                    </div>

                    <div class="text">{{ item.content }}</div>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
    </div>
</template>
  
<script setup>
import { ref, reactive, getCurrentInstance, defineProps, onMounted, shallowReactive, nextTick,onUnmounted} from 'vue'
import faker from '@/utils/faker';
/* const props = defineProps({
    items: Array,
}); */
const list = ref()
const state = shallowReactive({
    fakerArr: [],

    loadedImages: new Set()
});
const observer = ref(null); // IntersectionObserver 实例
onMounted(() => {
    state.fakerArr = JSON.parse(faker());
    // console.log("fakerArr",localStorage.getItem("fakerList"));
    /* nextTick(() => {
        const options = {
            root: getCurrentInstance(),
            rootMargin: '50px',
            threshold: 0.5
        }
        console.log("组件", getCurrentInstance());

        const observer = new IntersectionObserver(handleIntersection, options)
        const imgElements = document.querySelectorAll('img')
        console.log("所有图片", imgElements);
        imgElements.forEach((el) => {
            observer.observe(el)
        })
    }) */
    handleScroll()
})

const shouldLoad = (index) => {
    const item = state.fakerArr[index]
    return !state.loadedImages.has(item.src)
}
const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const imgElement = entry.target
            imgElement.src = imgElement.dataSet.src;
            console.log("imgElement", imgElement);
            observer.unobserve(imgElement)
        }
    })
}

const onImageLoad = (index) => {
    const item = state.fakerArr[index]
    // console.log("这里", item);
    state.loadedImages.add(item.img)
    // console.log("集合", state.loadedImages);
}



const throttle = (fn, delay) => {
    let timerId;
    let lastArgs;
    const throttledFn = (...args) => {
        lastArgs = args;
        if (!timerId) {
            timerId = setTimeout(() => {
                // console.log("ceshi");
                fn(...lastArgs)
                timerId = null
            }, delay)
        }
    }
    return throttledFn();
}
const handleScroll = () => {
    // console.log(666);
    const listEl = list.value

    if (!observer.value) {
        // 创建 IntersectionObserver 对象
        observer.value = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 加载图片
                    const imgt = entry.target;
                    console.log("img元素", imgt);
                    imgt.src = imgt.dataSet.src;
                    observer.unobserve(imgt); // 停止观察已经加载的图片
                }
            });
        });
    }

    // 获取所有需要预加载的图片
    const items = listEl.querySelectorAll("img")
    // 将需要预加载的图片加入 IntersectionObserver 的观察列表中
    items.forEach(img => observer.observe(img));
}
const handleScrollThrottled = () => {
    throttle(handleScroll, 500);
    // console.log("进来");
}

onUnmounted(() => {
  // 在组件卸载前取消 IntersectionObserver 对象的观察
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>
  
<style scoped lang="less">
.main-body {
    height: 800px;
    width: 600px;
    background-color: pink;

    .scroller {
        height: 100%;

        .avatar {
            img {
                width: 60px;
                height: 60px;
            }
        }
    }
}
</style>