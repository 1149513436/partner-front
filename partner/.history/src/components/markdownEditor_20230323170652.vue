<template>
   <div class="">
      <v-md-editor model-value="modelValue" 
      :height="height+'px'" :disabled-menus="[]"
      @upload-image="handleUploadImage"
      >
   </v-md-editor>
   </div>
</template>

<script setup>
import { reactive,ref  } from 'vue';

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

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
const handleUploadImage=()=>{
   console.log("666");
   insertImage({
        url:
          'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg',
        desc: '七龙珠',
        // width: 'auto',
        // height: 'auto',
      });
}
</script>

<style>
</style>
