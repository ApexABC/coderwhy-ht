<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <ElIcon><Message /></ElIcon>
      </span>
      <span>
        <ElIcon><ChatDotRound /></ElIcon>
      </span>
      <span>
        <ElIcon><Search /></ElIcon>
      </span>
    </div>
    <el-dropdown>
      <span class="user-info">
        <el-avatar
          :size="30"
          src="https://tse2-mm.cn.bing.net/th/id/OIP-C.itvokmEWEYJfJNz6Ox6V3wHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        />
        <span class="name">{{ loginStore.userInfo.name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <ElIcon><CircleClose /></ElIcon>
            <span>退出系统</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><InfoFilled /></el-icon>
            <span>个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Unlock /></el-icon>
            <span>修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { localCache } from '@/utlis/cache'
import useLoginStore from '@/store/login'
const router = useRouter()
function handleExitClick() {
  localCache.removeCache('token')
  router.push('/login')
}
const loginStore = useLoginStore()
</script>

<style lang="less" scoped>
.header-info {
  width: 300px;
  display: flex;
  justify-content: space-between;
  .operation {
    width: 80px;
    display: flex;
    justify-content: space-between;
  }
  .user-info {
    display: flex;
    cursor: pointer;
    .el-avatar {
      transform: translateY(-5px);
      margin-right: 10px;
    }
  }
  :focus {
    outline: none;
  }
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
