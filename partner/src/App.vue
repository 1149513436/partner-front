<script setup>
import {  RouterView } from 'vue-router'
import { nextTick, provide, ref } from 'vue';
const isRouterAlive=ref(true)
const reload=()=>{
  isRouterAlive.value=false;
  nextTick(()=>{
    isRouterAlive.value=true;
  })
}
provide('load',reload)
</script>

<template>
  <RouterView v-if="isRouterAlive"></RouterView>
</template>


<style></style>