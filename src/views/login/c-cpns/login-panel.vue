<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="账号登陆" name="account">
          <template #label>
            <el-icon style="margin-right: 10px"><UserFilled /></el-icon>
            账号登陆
          </template>
          <!-- :model="formLabelAlign"  :label-position="labelPosition"-->
          <el-form
            :model="account"
            label-width="80px"
            style="max-width: 460px"
            :rules="accountRules"
            ref="accountForm"
          >
            <el-form-item label="账号" prop="name">
              <el-input v-model="account.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="account.password" show-password />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <el-icon style="margin-right: 10px"><Iphone /></el-icon>
            手机登录
          </template>
          <!-- :model="formLabelAlign"  :label-position="labelPosition"-->
          <el-form label-width="80px" style="max-width: 460px">
            <el-form-item label="账号">
              <el-input />
            </el-form-item>
            <el-form-item label="密码">
              <el-input />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="savePassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="login()">立即登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utlis/cache'
// 保存勾选
const savePassword = ref<boolean>(localCache.getCache('isSavePassword') ?? false)
watch(savePassword, (newValue) => {
  localCache.setCache('isSavePassword', newValue)
})
// tab栏选中id
const activeName = ref('account')
// 账号登录方式信息
const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
// 定义校验规则
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { min: 5, max: 10, message: '账号为5-10位', trigger: 'blur' }
  ],
  password: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
})
// 获取账号登录方式ref
const accountForm = ref<InstanceType<typeof ElForm>>()
// 使用pinia
const loginStore = useLoginStore()
// 登录按钮回调
function login() {
  if (activeName.value === 'account') {
    // 表单验证是否通过
    accountForm.value?.validate((valid) => {
      if (valid) {
        loginStore.loginAccountAction(account)
        // 是否记住密码
        if (savePassword.value) {
          localCache.setCache('name', account.name)
          localCache.setCache('password', account.password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      } else {
        ElMessage.error('验证失败')
        console.log(loginStore.token)
      }
    })
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  h1 {
    margin: auto;
    margin-bottom: 10px;
  }
  .controls {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
