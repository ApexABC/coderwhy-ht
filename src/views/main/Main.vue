<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '220px'">
        <div class="mask"></div>
        <MainMenu :isFold="isFold"></MainMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @fold-change="handleFoldChange"></MainHeader>
        </el-header>
        <el-main><RouterView></RouterView></el-main>
      </el-container>
    </el-container>
    <!-- <button @click="exit">退出登录</button> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
// import router from '@/router'
// import { localCache } from '@/utlis/cache'

// const exit = () => {
//   // 删除token
//   localCache.removeCache('token')
//   // 跳回login
//   router.push('/login')
// }
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
.main-content {
  height: 100%;
  .el-aside {
    // background-color: pink;
    transition: all 1s;
    position: relative;
    overflow: hidden;
    .mask {
      height: 100%;
      width: 1px;
      background-color: #001529;
      position: absolute;
      z-index: 10;
      overflow: hidden;
      left: 219px;
    }
  }
  .el-header {
    // background-color: antiquewhite;
  }
  .el-main {
    // background-color: skyblue;
    background-color: #eee;
  }
}
</style>
