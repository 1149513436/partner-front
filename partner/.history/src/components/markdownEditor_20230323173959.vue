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
const handleUploadImage=(event, insertImage, files)=>{
   console.log("666");
   insertImage({
        url:
          'https://www.baidu.com/link?url=1IoYbIHlXh_JCCQE7eJyCpjgltGEUkYPIS5_hO0SZG3a_iAeuRcnT_tocdEJen3Xu7GGPC6n6Ll5vWGu2PtQmxy8iQv_NumZLQRicg4V1bBgcVLmUqbbWEgVvc09WSttXwk0z4khxBegiSUPw3jaznOhfCZRYjA_iIKSF7qbYl3GaIVB9oUzaTcE87L2dLASD2tvQIsFoARkt7gfI0KqjL8Tm5F7Xdxxg7A8mdVD_DZ6osaHfuX9XWXrHZdsMjW27d8q75TTDp8yQDFrkiapcbmEGBX0vEl03gKeP7PjeNatebNRKbOKT7tvDt1ZTgXrqSXpkGlz5TtLvtWdVg57hMG9s7oXS6WOSkwadw6Cezam3WssOeTRvnKKYoKl7T4QfR-joreu_HnZ7s-wjJK-a7HwkGrxDPolLNtyezqjuwkDyQB8mRsupo_Xctf_M6NQG9HhvoNNS0l5yd9VHUq_m-LaYBUlpZV5kgYzSn7AbbQ-fuMTfGv4tE2Q4VNR7nl2zYDPA83DW4nUElmWduIu5Uapi09o67eYpsJYeKA47vHGJzOegAd6Cc2ySTmXcx2VU60xAHB1H10W0qz8AWQj_cGnm_ONT7Nz4Muk0iMZbAdMqNcyFstP9DntpKQFtN42RhlnT3I8hPte43EfTzF_q3l4oq6TjNz-7xV-zRQxsZ3&wd=&eqid=f128786d000286c400000006641c1db2',
        desc: '七龙珠',
        // width: 'auto'
        // height: 'auto',
      });
}
</script>

<style>
</style>
