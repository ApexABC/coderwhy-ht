<template>
  <div class="chart-card">
    <header><span>标题</span></header>
    <baseEchart :show-goods-list="showGoodsCount"></baseEchart>
  </div>
</template>

<script lang="ts" setup>
import baseEchart from '@/components/page-echarts'
import { defineProps } from 'vue'
interface IProps {
  showGoodsCount: any[]
}
defineProps<IProps>()
</script>

<style lang="less" scoped>
.chart-card {
  margin-top: 15px;
  background-color: #fff;
  padding: 10px;
  header {
    line-height: 20px;
    padding: 0 0 10px 10px;
    border-bottom: 1px solid #ddd;
  }
}
</style>
