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
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components'
//安装自定义插件
app.use(globalComponent)
//将应用挂载到挂载点上
app.mount('#app')
