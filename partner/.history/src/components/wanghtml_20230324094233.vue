<template>
   <div class="">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
   </div>
</template>

<script setup>
import { reactive,ref  } from 'vue';
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'


const emit = defineEmits();
const props=defineProps({
   modelValue : {
      type:String,
      default:"hhh"
   },
   height:{
      type:Number,
      default:500
   }
})
</script>

<style>
</style>
