<template>
  <div class="app">
    <el-config-provider :locale="zhCn"><router-view></router-view></el-config-provider>
  </div>
</template>

<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped>
.app {
  /* background-color: skyblue; */
  width: 100vw;
  height: 100vh;
}
</style>
