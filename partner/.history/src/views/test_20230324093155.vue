<template>
   <div class="">
    
  <markdown-editor v-model="text"></markdown-editor>
   </div>
</template>

<script setup>
import { reactive,ref  } from 'vue';

const text=ref()
</script>

<style>
</style>
