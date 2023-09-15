<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" icon="plus">添加品牌</el-button>
      <el-table style="margin: 10px 0" border>
        <el-table-column label="序号" width="80px" align="center"></el-table-column>
        <el-table-column label="品牌名称"></el-table-column>
        <el-table-column label="品牌LOGO"></el-table-column>
        <el-table-column label="品牌操作"></el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :pages="[3,5,7,9]" small
                     layout="prev,pager,next,jumper,->,sizes,total" :total="20"></el-pagination>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'

let pageNo = ref<number>(1)
let limit = ref<number>(3)
</script>
<style scoped></style>
