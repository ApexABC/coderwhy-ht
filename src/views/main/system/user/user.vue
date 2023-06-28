<template>
  <div class="user">
    <div class="search">
      <UserSearch @query-click="handleQueryClick" @reset-click="handleResetClick"></UserSearch>
    </div>
    <UserContent
      ref="contentRef"
      @new-user-click="handleNewUserClick"
      @edit-user-click="handleEditUserClick"
    ></UserContent>
    <UserModal ref="modalRef"></UserModal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
const contentRef = ref<InstanceType<typeof UserContent>>()
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleQueryClick(formData: any) {
  console.log('user', formData)
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
// 对modal组件操作
function handleNewUserClick() {
  modalRef.value?.setdialogTrue()
}
function handleEditUserClick(row: any) {
  modalRef.value?.setdialogTrue(row)
}
</script>

<style lang="less" scoped>
.user {
}
</style>
