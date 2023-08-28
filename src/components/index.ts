//引入项目中的全局组件
//@ts-ignore
import SvgIcon from './SvgIcon/index.vue'
//全局对象
const allGlobalComponent = { SvgIcon }
//对外暴露插件对象
export default {
  //务必叫做install方法
  //@ts-ignore
  install(app) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      //注册为全局组件
      //@ts-ignore
      app.component(key, allGlobalComponent[key])
    })
  },
}