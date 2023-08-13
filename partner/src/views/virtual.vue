<template>
    <dynamic-scroller ref="dynamicScroller" :items="items" :itemHeight="itemHeight" :buffer="buffer" :scrollDirection="scrollDirection">
      <div class="item" v-for="(item, index) in items" :key="index">
        <img v-if="shouldLoad(index)" :src="item.src" @load="onImageLoad(index)">
      </div>
    </dynamic-scroller>
  </template>
  
  <script>
  import 'intersection-observer'
  export default {
    data() {
      return {
        items: [...],
        itemHeight: 200,
        buffer: 50,
        scrollDirection: 'vertical',
        loadedImages: new Set()
      }
    },
    mounted() {
      this.$nextTick(() => {
        const options = {
          root: this.$el,
          rootMargin: '50px',
          threshold: 0.5
        }
        const observer = new IntersectionObserver(this.handleIntersection, options)
        const imgElements = this.$el.querySelectorAll('img')
        imgElements.forEach((el) => {
          observer.observe(el)
        })
      })
    },
    methods: {
      handleIntersection(entries, observer) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgElement = entry.target
            imgElement.src = imgElement.dataset.src
            observer.unobserve(imgElement)
          }
        })
      },
      shouldLoad(index) {
        const item = this.items[index]
        return !this.loadedImages.has(item.src)
      },
      onImageLoad(index) {
        const item = this.items[index]
        this.loadedImages.add(item.src)
      }
    }
  }
  </script>
  