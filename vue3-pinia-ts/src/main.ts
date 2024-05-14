import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import("@/styles/global.less")
import './style.css'
import 'element-plus/dist/index.css'
import 'animate.css'
import App from './App.vue'
import router from '@/router/index'
import registerComponents from '@/customComponents/listInstall'


const pinia = createPinia()
const app = createApp(App)
app.use(registerComponents)
app.use(ElementPlus)
app.use(router).use(pinia).mount('#app')