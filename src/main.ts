import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error 忽略当前ts类型的检测否则有红色提示打包失败
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components'
//引入模板的全局的样式
import '@/styles/index.scss'
/*
 * 测试假接口能否使用
 * */
import axios from 'axios'
import router from './router'
import pinia from '@/store'

//获取应用实例对象
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})

//安装自定义插件
app.use(globalComponent)
//注册模板路由
app.use(router)
app.use(pinia)

//登录接口
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
})

//将应用挂载到挂载点上
app.mount('#app')
