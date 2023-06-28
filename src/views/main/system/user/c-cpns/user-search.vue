<template>
  <div class="userSearch">
    <ElForm size="large" label-width="100px" :model="searchForm" ref="formRef">
      <el-row :gutter="30">
        <el-col :span="8">
          <ElFormItem label="用户名：" prop="name">
            <ElInput v-model="searchForm.name" placeholder="请输入用户名"></ElInput>
          </ElFormItem>
        </el-col>
        <el-col :span="8">
          <ElFormItem label="真实姓名：" prop="realname">
            <ElInput v-model="searchForm.realname" placeholder="请输入真实姓名："></ElInput>
          </ElFormItem>
        </el-col>
        <el-col :span="8">
          <ElFormItem label="电话号码：" prop="cellphone">
            <ElInput
              v-model="searchForm.cellphone"
              placeholder="请输入电话号码："
            ></ElInput> </ElFormItem
        ></el-col>
        <el-col :span="8">
          <ElFormItem label="状态：" prop="enable">
            <el-select placeholder="请选择查询状态" style="width: 100%" v-model="searchForm.enable">
              <el-option label="启用" :value="0" />
              <el-option label="禁用" :value="1" />
            </el-select>
          </ElFormItem>
        </el-col>
        <el-col :span="8">
          <ElFormItem label="创建时间：" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            />
          </ElFormItem>
        </el-col>
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
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: undefined,
  createAt: ''
})
// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])
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
