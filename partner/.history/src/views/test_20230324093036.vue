<template>
   <div class="">
    
  <markdown-editor v-model="markdownContent"></markdown-editor>
   </div>
</template>

<script setup>
import { reactive,ref  } from 'vue';

const markdownContent=ref()
</script>

<style>
</style>
