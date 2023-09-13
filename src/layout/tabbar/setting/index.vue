<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0px 10px;border-radius: 50%;" />
  <!-- 下拉菜单 -->
  <el-dropdown style="margin-right: 10px">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//获取用户的小仓库
import useUserStore from '@/store/modules/user';
//获取骨架的小仓库
import useLayoutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
const fullScreen = () => {
  //DOM对象的一个属性：可以用来判断当前是不是全屏模式[全屏：true，不是全屏：false]
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style lang="scss" scoped></style>