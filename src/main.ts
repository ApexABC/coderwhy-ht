import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import registerStore from './store'
import 'normalize.css'
import '@/assets/css/index.less'
import registerIcon from '@/utlis/register-icon'
const app = createApp(App)

// 引入反馈组件样式
// import 'element-plus/theme-chalk/el-message.css'
app.use(registerIcon)
app.use(registerStore)
app.use(router)
app.mount('#app')
