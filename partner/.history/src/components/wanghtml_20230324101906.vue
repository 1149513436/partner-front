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
import { IDomEditor } from '@wangeditor/editor'
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
const editorConfig = { placeholder: '请输入内容...' }

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
</script>

<style>
</style>
