<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/image/logo.svg" />
      <h2 v-show="!isFold">CoderWhy-CMS</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        text-color="white"
        background-color="#001529"
        :collapse="isFold"
        :collapse-transition="false"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleItemClick(subItem)">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import useLoginStore from '@/store/login/index'
import { computed, ref } from 'vue'
import { mapPathToMenus } from '@/utlis/map-menus'
const router = useRouter()
// props
defineProps(['isFold'])
// 1.pinia获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
// 2.点击菜单item跳转对应路由
function handleItemClick(subItem: any) {
  router.push(subItem.url)
}
// 3.elMenu的默认菜单
const route = useRoute()
const defaultId = computed(() => mapPathToMenus(route.path, userMenus))
const defaultActive = ref(defaultId)
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
  border: 0px;
  // overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  .logo {
    display: flex;
    justify-content: space-evenly;
    padding-top: 10px;
    img {
      width: 40px;
    }
    h2 {
      font-size: 18px;
      line-height: 40px;
      color: white;
    }
  }
}
</style>
