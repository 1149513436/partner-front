
<!-- eslint-disable-next-line import/no-unresolved -->
<!-- eslint-disable-next-line import/no-webpack-loader-syntax -->
<!-- eslint-disable-next-line --require ./path/to/.eslintrc.editor.js -->
<template>
  <div >
 
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
       @onChange="handleChange"
     />
  </div>
</template>

<script setup>
import { reactive,ref,nextTick  } from 'vue';

import '@wangeditor/editor/dist/css/style.css' // 引入 css
// import { IDomEditor } from '@wangeditor/editor'
// import { IEditorConfig } from '@wangeditor/editor'

// import eslint from 'eslint'
import { onBeforeUnmount, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Boot } from '@wangeditor/editor'
import attachmentModule from '@wangeditor/plugin-upload-attachment'
import eslint from "node_modules/eslint";
// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(attachmentModule)
components: { Editor, Toolbar }
// const eslint = require("eslint");

const linter = new eslint.Linter();
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
const mode=ref("default")

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()


// 内容 HTML
const valueHtml = ref('<p></>')
// 模拟 ajax 异步获取内容
onMounted(() => {

})

const toolbarConfig = {
  insertKeys: {
      index: 0,
      keys: ['uploadAttachment'], // “上传附件”菜单
    }, 
}
const editorConfig = {  
  MENU_CONF: {},
  hoverbarKeys: {
    attachment: {
      menuKeys: ['downloadAttachment'], // “下载附件”菜单
    },
  },
  customAlert:{
    function (msg) {
      // 使用 wangeditor5 提供的提示方法
      this.$alert(msg);
    }
  }
 }
//内容变化时
const handleChange=(editor)=>{
 console.log('content', editor.children)
 console.log("html内容",editor.getHtml());
/*  const linter = new eslint.CLIEngine();
  const report = linter.executeOnText(editor.getHtml());
  if (report.errorCount > 0) {
    console.error("错误",report.results[0].messages);
  } */
}


 


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
   const editor = editorRef.value
   if (editor == null) return
   editor.destroy()
})

const handleCreated = (editor) => {
 editorRef.value = editor // 记录 editor 实例，重要！
 // console.log("菜单配置",editor.getConfig());
/*  editor.config.customizeValue = true
   editor.config.linkImgCallback = (url, alt, linkImg) => {
     linkImg.style.display = 'inline'
   } */
}

function withBreakAndDelete(editor) {                            // JS 语法

   const { insertBreak, deleteBackward,isInline } = editor // 获取当前 editor API
   const newEditor = editor

   // 重写 insertBreak 换行
   newEditor.insertBreak = () => {
       // if: 是 ctrl + enter ，则执行 insertBreak
       insertBreak()

       // else: 则不执行换行
       return
   }
   newEditor.isInline = elem => {
   const type = DomEditor.getNodeType(elem)
   if (type == 'image'){
     console.log("行内");
     return true // 针对 type: image ，设置为 inline
   } 
   return isInline(elem)
 }

  /*  // 重写 deleteBackward 向后删除
   newEditor.deleteBackward = unit => {
       // if： 某种情况下，执行默认的删除
       deleteBackward(unit)

       // else: 其他情况，则不执行删除
       return
   } */

   // 重写其他 API ...

   // 返回 newEditor ，重要！
   return newEditor
}
/* 上传图片 */
editorConfig.MENU_CONF['uploadImage'] = {
   server: '/api/file/upload',
   // form-data fieldName ，默认值 'wangeditor-uploaded-image'
   fieldName: 'file',

   // 单个文件的最大体积限制，默认为 2M
   maxFileSize: 5 * 1024 * 1024, // 1M
   base64LimitSize: 300 * 1024, // 5kb
   
   // 最多可上传几个文件，默认为 100
   // maxNumberOfFiles: 10,

   // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
   // allowedFileTypes: ['image/*'],

   customInsert(res, insertFn,editor) {                  // JS 语法,自定义上传图片
       
       insertFn(res.data, "","")//src，图片描述，图片链接
       editor.$txt.find('img').css('display', 'inline') // 将插入的图片样式设置为inline
   },
  
   

   // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
   // meta: {
   //     token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJkNjYyMDgxOTczMmU0ODhjOTdjZmE1NGMzYjUwNWZkOCIsInJuU3RyIjoiZHl2QWdrN3dad25oYlllY290NFJDbGhGOFZYRU1JaFgifQ.8y2VgDwQdtmS5n_gI1cFQD909sbNK4O0Md3iQbZkB78',
   // },

   // // 将 meta 拼接到 url 参数中，默认 false
   // metaWithUrl: false,

   // // 自定义增加 http  header
   // headers: {
   //     Accept: 'text/x-json',
   //     otherKey: 'xxx'
   // },

   // 跨域是否传递 cookie ，默认为 false
   // withCredentials: true,

   // 超时时间，默认为 10 秒
   timeout: 5 * 1000, // 5 秒
   onBeforeUpload(file) {    // JS 语法
       // file 选中的文件，格式如 { key: file }
       console.log("file",file);
       return file

       // 可以 return
       // 1. return file 或者 new 一个 file ，接下来将上传
       // 2. return false ，不上传这个 file
   },
  
   onSuccess(file, res) {          // JS 语法
       console.log(`${file.name} 上传成功`, res)
   },
   onFailed(file, res) {
       
       console.log('onFailed', file, res)
     },
     onError(file, err, res) {
       alert(err.message)
       console.error('onError', file, err, res)
     },
}

/* 上传附件 */
editorConfig.MENU_CONF['uploadAttachment']={
 
      server: '/api/file/upload', //一个文件地址
      timeout: 5 * 1000, // 5s

      fieldName: 'file',
      // meta: { token: 'xxx', a: 100 },
      // metaWithUrl: true, // 参数拼接到 url 上
      // headers: { Accept: 'text/x-json' },

      maxFileSize: 10 * 1024 * 1024, // 10M

      onBeforeUpload(file) {
        console.log('onBeforeUpload', file)
        return file // 返回哪些文件可以上传
        // return false // 会阻止上传
      },
    /*   onProgress(progress) {
        console.log('onProgress', progress)
      }, */
      onSuccess(file, res) {
        console.log('onSuccess', file, res)
      },
      onFailed(file, res) {
        alert(res.message)
        console.log('onFailed', file, res)
      },
  /*     onError(file, err, res) {
        alert(err.message)
        console.error('onError', file, err, res)
      }, */

      // // 用户自定义插入文件
      // customInsert(res: any, file: File, insertFn: Function) {
      //   console.log('customInsert', res)
      //   const { url } = res.data || {}
      //   if (!url) throw new Error(`url is empty`)

      //   // 自己插入附件
      //   insertFn(`customInsert-${file.name}`, url)
      // },

      // // 用户自定义上传
      // customUpload(file: File, insertFn: Function) {
      //   console.log('customUpload', file)

      //   return new Promise(resolve => {
      //     // 插入一个文件，模拟异步
      //     setTimeout(() => {
      //       const src = `https://www.w3school.com.cn/i/movie.ogg`
      //       insertFn(`customUpload-${file.name}`, src)
      //       resolve('ok')
      //     }, 500)
      //   })
      // },

      // // 自定义选择
      // customBrowseAndUpload(insertFn: Function) {
      //   alert('自定义选择文件，如弹出图床')
      // },

      onInsertedAttachment(elem) {
        console.log('inserted attachment', elem)
      },
    
}
</script>

<style lang="less">

</style>
