import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error 忽略当前ts类型的检测否则有红色提示打包失败
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//获取应用实例对象
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
console.log(import.meta.env)
//将应用挂载到挂载点上
app.mount('#app')
