<template>
  <div class="layout_container">
    <!--    左侧菜单-->
    <div
      class="layout_slider"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <!-- 滚动菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :collapse="LayoutSettingStore.fold ? true : false"
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
        >
          <Menu :MenuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--    顶部导航-->
    <div
      class="layout_tabbar"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <!-- layout组件的顶部导航tabbar -->
      <Tabbar></Tabbar>
    </div>
    <!--    内容展示区域-->
    <div
      class="layout_main"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from 'vue-router'
import Logo from '@/layout/logo/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//引入顶部tabbar组件
import Tabbar from '@/layout/tabbar/index.vue'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
//右侧内容展示区域
import Main from './main/index.vue'
let userStore = useUserStore()

//获取路由对象
let $route = useRoute()
</script>
<script lang="ts">
//获取layout配置仓库
import useLayoutSettingStore from '@/store/setting'
let LayoutSettingStore = useLayoutSettingStore()
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    background: $base-menu-background;
    width: $base-menu-width;
    height: 100vh;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      color: white;

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: yellowgreen;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
