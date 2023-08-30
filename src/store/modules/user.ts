//创建用户相关的小仓库
import { defineStore } from 'pinia'
import {reqLogin} from "@/api/user";
import {loginForm} from "@/api/user/type.ts";

let useUserStore = defineStore('User', {
  //小仓库存储数据
  state: () => {
    return {
      token:localStorage.getItem('TOKEN')
    }
  },
  //异步|逻辑
  actions: {
    async userLogin(data:loginForm){
      let result:any= await reqLogin(data)
      if(result.code==200){
        //pinia|vuex存储数据其实利用js对象，并不持久化
        this.token=result.data.token
        localStorage.setItem('TOKEN',result.data.token)
        return 'ok'
      }else{
        return Promise.reject(new Error(result.data.message))
      }
    }
  },
  getters: {},
})
export default useUserStore
