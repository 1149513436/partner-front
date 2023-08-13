<template>
   <div class="">
      <v-md-editor v-model="modelValue" :height="height+'px'"></v-md-editor>
   </div>
</template>

<script setup>
import { reactive,ref  } from 'vue';
import { createApp } from 'vue';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// highlightjs
import hljs from 'highlight.js';
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const props=defineProps({
   modelValue:{
      type:String,
      default:""
   },
   height:{
      type:Number,
      default:500
   }
})
</script>

<style>
</style>
