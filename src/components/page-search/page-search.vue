<template>
  <div class="userSearch" v-if="isQuery">
    <ElForm
      size="large"
      :label-width="searchConfig.labelWidth ?? '100px'"
      :model="searchForm"
      ref="formRef"
    >
      <el-row :gutter="30">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <ElCol :span="8">
            <ElFormItem :label="item.label" :prop="item.props">
              <template v-if="item.type === 'input'">
                <ElInput v-model="searchForm[item.prop]" :placeholder="item.placeholder"></ElInput>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                />
              </template>
            </ElFormItem>
          </ElCol>
        </template>
      </el-row>
    </ElForm>
    <div class="btns">
      <el-button type="primary" size="large" icon="search" @click="handleQueryClick"
        >搜索</el-button
      >
      <el-button size="large" icon="Refresh" @click="handleResetClick">重置</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ElForm } from 'element-plus'
import { reactive, ref, defineEmits } from 'vue'
import usePermission from '@/hooks/usePermission'
// 定义自定义事件 和接收属性
const emit = defineEmits(['queryClick', 'resetClick'])
interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
    labelWidth?: string
  }
}
const props = defineProps<IProps>()
// 按钮权限
const isQuery = usePermission(`${props.searchConfig.pageName}:query`)

const initialFrom: any = {}
for (const item of props.searchConfig.formItems) {
  initialFrom[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialFrom)

// 1.重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}
// 2.查询操作
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.userSearch {
  background-color: #fff;
  padding: 20px 20px 20px 0px;
  border-radius: 8px;
  .btns {
    display: flex;
    justify-content: end;
  }
}
</style>
