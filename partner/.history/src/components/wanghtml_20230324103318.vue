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
// import { IDomEditor } from '@wangeditor/editor'
import { IEditorConfig } from '@wangeditor/editor'
import { onBeforeUnmount, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
components: { Editor, Toolbar }

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
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    }, 1500)
})

const toolbarConfig = {}
const editorConfig = {  MENU_CONF: {} }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
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
    if (type === 'image') return true // 针对 type: image ，设置为 inline
    return isInline(elem)
  }

    // 重写 deleteBackward 向后删除
    newEditor.deleteBackward = unit => {
        // if： 某种情况下，执行默认的删除
        deleteBackward(unit)

        // else: 其他情况，则不执行删除
        return
    }

    // 重写其他 API ...

    // 返回 newEditor ，重要！
    return newEditor
}
/* 上传图片 */
editorConfig.MENU_CONF['uploadImage'] = {
    server: '/file/upload',
    // form-data fieldName ，默认值 'wangeditor-uploaded-image'
    fieldName: 'your-custom-name',

    // 单个文件的最大体积限制，默认为 2M
    maxFileSize: 1 * 1024 * 1024, // 1M

    // 最多可上传几个文件，默认为 100
    maxNumberOfFiles: 10,

    // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    allowedFileTypes: ['image/*'],

    // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
    meta: {
        token: 'xxx',
        otherKey: 'yyy'
    },

    // 将 meta 拼接到 url 参数中，默认 false
    metaWithUrl: false,

    // 自定义增加 http  header
    headers: {
        Accept: 'text/x-json',
        otherKey: 'xxx'
    },

    // 跨域是否传递 cookie ，默认为 false
    withCredentials: true,

    // 超时时间，默认为 10 秒
    timeout: 5 * 1000, // 5 秒

   
    onSuccess(file, res) {          // JS 语法
        console.log(`${file.name} 上传成功`, res)
    },
}
</script>

<style>
</style>
