<template>
  <div class="department">
    <PageSearch @query-click="handleQueryClick" @reset-click="handleResetClick"></PageSearch>
    <PageContent
      ref="contentRef"
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
    ></PageContent>
    <PageModal ref="modalRef"></PageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setdialogTrue(itemData)
}
function handleNewClick() {
  modalRef.value?.setdialogTrue()
}
</script>

<style scoped>
.department {
}
</style>
