<template>
  <div class="modal">
    <el-dialog
      v-model="dialogFormVisible"
      :title="isNew ? '新建用户' : '修改用户'"
      center
      width="40%"
    >
      <el-form :model="formData" label-width="100px" ref="formRef">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="isNew">
          <el-input v-model="formData.password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
            <el-option
              v-for="role in entireRoles"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
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
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
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
const { entireRoles, entireDepartment } = storeToRefs(mainStore)
// 表单确认按钮
const systemStore = useSystemStote()
function handleConfirmClick() {
  dialogFormVisible.value = false
  if (isNew.value) {
    // 新建数据
    systemStore.getNewUser(formData)
  } else {
    // 修改数据
    systemStore.getEditUser(userId.value!, formData)
  }
}
</script>

<style lang="less" scoped>
.modal {
}
</style>
