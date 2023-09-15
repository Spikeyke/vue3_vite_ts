//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { UserState } from '@/store/modules/types/type.ts'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'
import type {loginFormData,loginResponseData,userInfoResponseData} from "@/api/user/type";
//引入路由（常量路由
import { constantRoute } from '@/router/router'

const useUserStore = defineStore('User', {
  //小仓库存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
      username: '',
      avatar: '',
    }
  },
  //异步|逻辑
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        //pinia|vuex存储数据其实利用js对象，并不持久化
        this.token = result.data as string
        // localStorage.setItem('TOKEN', (result.data.token as string))
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      let result:userInfoResponseData = await reqUserInfo()
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录方法
    async userLogout() {
      let result:any = await reqLogout()
      if (result.code == 200) {
        //目前没有mock接口：退出登录接口（通知服务器本地用户唯一标识失效）
          (this.token = ''),
          (this.username = ''),
          (this.avatar = ''),
          REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
