<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item">
        <el-col :span="6"><count-card v-bind="item"></count-card></el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7"><chartCard :show-goods-count="showGoodsCount"></chartCard></el-col>
      <!-- <el-col :span="10"><chartCard></chartCard></el-col>
      <el-col :span="7"><chartCard></chartCard></el-col> -->
    </el-row>
    <!-- <el-row :gutter="10">
      <template v-for="item in 2" :key="item">
        <el-col :span="12"><chartCard></chartCard></el-col>
      </template>
    </el-row> -->
  </div>
</template>

<script lang="ts" setup>
import useAnalysisStore from '@/store/main/analysis/analysis'
import CountCard from './c-cpns/count-card.vue'
import { storeToRefs } from 'pinia'
import chartCard from './c-cpns/chart-card.vue'
import { computed } from 'vue'
// 发请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
// 获取amount数据
const { amountList, goodsCount } = storeToRefs(analysisStore)
const showGoodsCount = computed(() => {
  return goodsCount.value.map((item: any) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
</script>

<style lang="less" scoped>
.dashboard {
}
</style>
