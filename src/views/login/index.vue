<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              :loading="loading"
              type="primary"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time.ts'

let loginForms = ref()
let useStore = useUserStore()
//获取路由器
let $router = useRouter()
//获取路由对象
let $route = useRoute()
//定义变量控制按钮加载效果
let loading = ref(false)
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
const login = async () => {
  await loginForms.value.validate()
  loading.value = true
  try {
    //保证登录成功
    await useStore.userLogin(loginForm)
    loading.value = false
    //判断登录的时候，路由路径当中是否有query参数，如果有就往query参数跳转，没有跳转首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `HI,${getTime()}好`,
    })
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
const validatorPassWord = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
//表单校验需要配置的对象
const rules = {
  username: [
    // {
    //   required: true,
    //   min: 6,
    //   max: 10,
    //   message: '账号长度至少6位',
    //   trigger: 'change',
    // },
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    // {
    //   required: true,
    //   min: 6,
    //   max: 10,
    //   message: '账号长度至少6位',
    //   trigger: 'change',
    // },
    { trigger: 'change', validator: validatorPassWord },
  ],
}
</script>
<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
