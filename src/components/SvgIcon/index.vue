<template>
  <div>
    <!--    svg:图标外层容器节点，内部需要与use标签结合使用-->
    <!--    <svg width="30px">
          &lt;!&ndash;      xlink:href执行用哪一个图标&ndash;&gt;
          &lt;!&ndash;      <use xlink:href="#icon-file"></use>&ndash;&gt;
        </svg>-->
    <svg width="30px">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>
<script setup lang="ts">
//接受父组件传递的参数
defineProps({
  //xlink:href属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  //提供使用图标的名字
  name: String,
  //接收父组件传递的颜色
  color: {
    type: String,
    default: '',
  },
})
</script>
<style scoped></style>
