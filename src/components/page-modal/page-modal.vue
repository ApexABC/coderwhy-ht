<template>
  <div class="modal">
    <el-dialog
      v-model="dialogFormVisible"
      :title="isNew ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      center
      width="40%"
    >
      <el-form :model="formData" label-width="100px" ref="formRef">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <ElFormItem :label="item.label" :prop="item.props">
            <template v-if="item.type === 'input'">
              <ElInput v-model="formData[item.prop]" :placeholder="item.placeholder"></ElInput>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="formData[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="large"
              />
            </template>
            <template v-if="item.type === 'select'">
              <ElSelect
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="option in item.options" :key="option.value">
                  <ElOption :label="option.label" :value="option.value"></ElOption>
                </template>
              </ElSelect>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </ElFormItem>
        </template>
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
import useSystemStote from '@/store/main/system/system'
import { reactive, ref } from 'vue'
// 定义props
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()
// 表单数据
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)
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
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
  }
}
defineExpose({ setdialogTrue })
// 获取角色和部门数据
// const mainStore = useMainStore()
// const { entireDepartment } = storeToRefs(mainStore)
// 表单确认按钮
const systemStore = useSystemStote()
function handleConfirmClick() {
  dialogFormVisible.value = false
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (isNew.value) {
    // 新建数据
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  } else {
    // 修改数据
    systemStore.editPageDataAction(props.modalConfig.pageName, userId.value!, infoData)
  }
}
</script>

<style lang="less" scoped>
.modal {
}
</style>
