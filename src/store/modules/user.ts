//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { loginForm, loginResponseData } from '@/api/user/type.ts'
import { UserState } from '@/store/modules/types/type.ts'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token.ts'
//引入路由（常量路由
import { constantRoute } from '@/router/router'

const useUserStore = defineStore('User', {
  //小仓库存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
    }
  },
  //异步|逻辑
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        //pinia|vuex存储数据其实利用js对象，并不持久化
        this.token = result.data.token as string
        // localStorage.setItem('TOKEN', (result.data.token as string))
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
