<template>
  <div class="modal">
    <el-dialog
      v-model="dialogFormVisible"
      :title="isNew ? '新建部门' : '修改部门'"
      center
      width="40%"
    >
      <el-form :model="formData" label-width="100px" ref="formRef">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="formData.parentId" placeholder="请选择上级部门" style="width: 100%">
            <el-option
              v-for="depart in entireDepartment"
              :key="depart.id"
              :label="depart.name"
              :value="depart.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick()">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useMainStore from '@/store/main/main'
import useSystemStote from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
// 表单数据
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
const userId = ref<number>()
const isNew = ref(true)
// 控制dialog弹出
const dialogFormVisible = ref(false)
function setdialogTrue(itemData?: any) {
  dialogFormVisible.value = true
  if (itemData) {
    // 修改用户信息
    isNew.value = false
    userId.value = itemData.id
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    // 新建用户信息
    isNew.value = true
    for (const key in formData) {
      formData[key] = ''
    }
  }
}
defineExpose({ setdialogTrue })
// 获取角色和部门数据
const mainStore = useMainStore()
const { entireDepartment } = storeToRefs(mainStore)
// 表单确认按钮
const systemStore = useSystemStote()
function handleConfirmClick() {
  dialogFormVisible.value = false
  if (isNew.value) {
    // 新建数据
    systemStore.newPageDataAction('department', formData)
  } else {
    // 修改数据
    systemStore.editPageDataAction('department', userId.value!, formData)
  }
}
</script>

<style lang="less" scoped>
.modal {
}
</style>
