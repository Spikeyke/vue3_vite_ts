<template>
  <div class="">
    <el-card class="box-card">
      <el-button type="primary" icon="plus">添加品牌</el-button>
      <el-table style="margin: 10px 0" border :data="tradeMarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <!--        table-column:默认展示数据用div-->
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{row,$index}">
            <img :src="row.logoUrl" style="width: 60px;height: 50px">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{row}">
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :pages="[3,5,7,9]" small
                     layout="prev,pager,next,jumper,->,sizes,total" :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {reqHasTrademark} from "@/api/product/trademark/index";

let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let tradeMarkArr = ref<any>([])
const getHasTrademark = async () => {
  let result = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code == 200) {
    total.value = result.data.total
    tradeMarkArr.value = result.data.records
    tradeMarkArr.value.map(item=>{
      if(item.tmName=='小米'){
        item.logoUrl='http://'+item.logoUrl
      }
    })
  }
}
onMounted(() => {
  getHasTrademark()
})
</script>

<style lang="scss" scoped></style>
