import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import  '../public/reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import markdownEditor from './components/markdownEditor.vue'
import wanghtml from './components/wanghtml.vue'

import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

//pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' 
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) //使用持久化插件
app.use(pinia)
// app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VueVirtualScroller)
app.component("markdownEditor",markdownEditor)
app.component("wanghtml",wanghtml)
app.mount('#app')
