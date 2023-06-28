<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIcon">
      <el-icon size="28px" v-if="!isFold"><Fold /></el-icon>
      <el-icon size="28px" v-else><Expand /></el-icon>
    </div>
    <div class="content">
      <HeaderCrumb></HeaderCrumb>
      <div class="info"><HeaderInfo></HeaderInfo></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 控制菜单栏是否折叠
const isFold = ref(false)
// 内部定义自定义事件
const emit = defineEmits(['foldChange'])
function handleMenuIcon() {
  isFold.value = !isFold.value
  // 向父组件传值
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  height: 100%;
  align-items: center;
  .menu-icon {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .content {
    flex: 20;
    display: flex;
    justify-content: space-between;
    transform: translateY(5px);
  }
}
</style>
