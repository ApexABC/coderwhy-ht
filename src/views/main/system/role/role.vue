<template>
  <div class="role">
    <PageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></PageSearch>
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
    ></PageContent>
    <pageModal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menuTree>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </pageModal>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { mapMenusToIds } from '@/utlis/map-menus'
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal(newCallback, editCallback)
// 获取menu
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleElTreeCheck(_: any, data: any) {
  const menuList = [...data.checkedKeys, ...data.halfCheckedKeys]
  otherInfo.value = { menuList }
}
const treeRef = ref<InstanceType<typeof ElTree>>()
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(itemData: any) {
  nextTick(() => {
    const result = mapMenusToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(result)
  })
}
</script>

<style lang="less" scoped></style>
