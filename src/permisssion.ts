//路由鉴权
import router from '@/router'
import nprogress from 'nprogress'
//引入nprogress样式
import 'nprogress/nprogress.css'
//取消进度条加载圆圈
nprogress.configure({ showSpinner: false })
import pinia from './store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
//前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  const token = userStore.token
  const username = userStore.username
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          //token过期
          //用户手动修改本地存储token
          //退出登录
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//后置守卫
router.afterEach((to: any, from: any) => {
  document.title = 'vue+ts后台管理'
  nprogress.done()
})
