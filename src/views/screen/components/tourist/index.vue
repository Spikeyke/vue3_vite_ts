<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>9999999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item,index) in people" :key="index">{{ item }}</span>
    </div>
<!--    echarts展示图形的节点-->
    <div class="echarts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let people = ref('216908人')
//获取节点
let charts=ref()
onMounted(()=>{
  //获取echarts类的实例
  let mycharts =echarts.init(charts.value)
  //设置实例的配置项
  mycharts.setOption({
    series:{
      type:'liquidFill',
      data:[0.6,0.4],
      radius:'100%',
      outline: {//外层边框颜色设置
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: 'skyblue',
          borderColor: '#294D99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.25)'
        }
      },
    }
  })
})
</script>

<style lang="scss" scoped>
.box {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url('../../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 15px;

      span {
        color: lightgoldenrodyellow;
      }
    }
  }

  .number {
    display: flex;
    margin:  40px 20px 0 30px;
    span {
      flex: 1;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background: url('../../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .echarts{
    width:100%;
    height: 250px;
  }
}
</style>
