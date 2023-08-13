<template>
   <div class="">
      <v-md-editor model-value=modelValue 
      :height="height+'px'" :disabled-menus="[]"
      @upload-image="handleUploadImage"
      @change="change"
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
const handleUploadImage=(event, insertImage, files)=>{
   console.log("666");
   insertImage({
        url:'https://img0.baidu.com/it/u=3968480222,1424117387&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
          
        desc: '七龙珠',
        // width: 'auto'
        // height: 'auto',
      });
}

//编辑器改变内容后
const change=(text,html)=>{
  console.log("文本",text);
  console.log("html",html);
}
</script>

<style>
</style>
