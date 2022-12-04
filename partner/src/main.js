import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import  './assets/css/global.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' 
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) //使用持久化插件
app.use(pinia)
// app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
