//路由鉴权
import router from '@/router'
import nprogress from 'nprogress'
//引入nprogress样式
import 'nprogress/nprogress.css'
//前置守卫
router.beforeEach((to:any, from:any, next:any) => {
    nprogress.start()
    next()
})
//后置守卫
router.afterEach((to:any, from:any) => {
    nprogress.done()
})
