<template>
  <div class="content">
    <div class="header">
      <h3>用户列表</h3>
      <ElButton type="primary" @click="handleNewUserClick" v-if="isCreate">新建用户</ElButton>
    </div>
    <div class="table">
      <el-table
        :data="userList"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="realname" label="真实姓名" />
        <el-table-column prop="cellphone" label="电话" width="130" />
        <el-table-column prop="enable" label="状态" width="80" align="center">
          <template #default="{ row }">
            <ElButton size="small" :type="row.enable ? 'primary' : 'danger'" plain>{{
              row.enable ? '启用' : '禁用'
            }}</ElButton>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" width="250">
          <template #default="{ row }"> {{ formatUTC(row.createAt) }} </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" width="250">
          <template #default="{ row }"> {{ formatUTC(row.updateAt) }} </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <ElButton
              v-if="isUpdate"
              icon="edit"
              size="small"
              type="primary"
              @click="handleEditClick(row)"
              >编辑</ElButton
            >
            <el-popconfirm
              title="确定删除吗?"
              icon="WarningFilled"
              icon-color="red"
              @confirm="handleDeleteClick(row)"
            >
              <template #reference>
                <ElButton v-if="isDelete" icon="delete" size="small" type="danger">删除</ElButton>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="prev, pager, next, jumper,total, sizes"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useSystemStote from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utlis/format'
import { ref } from 'vue'
import usePermission from '@/hooks/usePermission'
// 定义事件
const emit = defineEmits(['newUserClick', 'editUserClick'])
// 用户权限判断
const isCreate = usePermission('users:create')
const isDelete = usePermission('users:delete')
const isUpdate = usePermission('users:update')
const isQuery = usePermission('users:query')
// 发起数据请求
const systemStore = useSystemStote()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()
// 或许数据进行展示
const { userList, totalCount } = storeToRefs(systemStore)
// 表单多选框
function handleSelectionChange() {}
// 分页器相关数据
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}
// 删除数据
async function handleDeleteClick(row: any) {
  systemStore.getDeleteUser(row.id, currentPage.value)
}
// 新建用户
function handleNewUserClick() {
  emit('newUserClick')
}
// 更改用户信息
function handleEditClick(row: any) {
  emit('editUserClick', row)
}
// 定义一个函数，用于发送网络请求
function fetchUserListData(formData?: any) {
  if (!isQuery) return
  let size = pageSize.value
  let offset = (currentPage.value - 1) * size
  const Info = { size, offset }
  systemStore.getUserListAction({ ...Info, ...formData })
}
defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  background-color: #fff;
  border-right: 8px;
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    // align-items: flex-end;
    margin-bottom: 10px;
  }
  .pagination {
    margin-top: 10px;
    .el-pagination {
      justify-content: center;
    }
  }
}
:deep(.el-table .el-table__cell) {
  padding: 15px 0;
}
</style>
