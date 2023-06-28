<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { mapPathToBreadcrumbs } from '@/utlis/map-menus'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login'
const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumb = computed(() => mapPathToBreadcrumbs(route.path, userMenus))
</script>

<style lang="less" scoped>
.crumb {
}
</style>
