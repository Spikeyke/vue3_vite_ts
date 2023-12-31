//引入项目中的全局组件
import SvgIcon from './SvgIcon/index.vue'
//引入 element-plus提供全局图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//全局对象
const allGlobalComponent = { SvgIcon }
//对外暴露插件对象
export default {
  //务必叫做install方法
  //@ts-expect-error
  install(app) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      //注册为全局组件
      //@ts-expect-error
      app.component(key, allGlobalComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
