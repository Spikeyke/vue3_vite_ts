//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
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
      username: '',
      avatar: ''
    }
  },
  //异步|逻辑
  actions: {
    //用户登录的方法
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
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字
      let result = await reqUserInfo()
      //如果获取用户信息成功，存储一下用户信息
      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      } else {

      }
    }
  },
  getters: {},
})
export default useUserStore
