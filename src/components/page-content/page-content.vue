<template>
  <div class="content">
    <div class="header">
      <h3>{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <ElButton v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig.header?.btnTitle ?? '新建数据'
      }}</ElButton>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item">
              <template #default="{ row }"> {{ formatUTC(row[item.prop]) }} </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item">
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
                  v-if="isDelete"
                >
                  <template #reference>
                    <ElButton icon="delete" size="small" type="danger">删除</ElButton>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="prev, pager, next, jumper,total, sizes"
        :total="pageTotalCount"
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
import { ref, defineProps, defineExpose } from 'vue'
import usePermission from '@/hooks/usePermission'
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()
// 定义事件
const emit = defineEmits(['newClick', 'editClick'])
// 按钮权限
const isCreate = usePermission(`${props.contentConfig.pageName}:create`)
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermission(`${props.contentConfig.pageName}:update`)
const isQuery = usePermission(`${props.contentConfig.pageName}:query`)
// 发起数据请求
const systemStore = useSystemStote()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()
// 或许数据进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// 表单多选框
function handleSelectionChange() {}
// 分页器相关数据
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}
// 删除数据
async function handleDeleteClick(row: any) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, row.id)
}
// 新建用户
function handleNewUserClick() {
  emit('newClick')
}
// 更改用户信息
function handleEditClick(row: any) {
  emit('editClick', row)
}
// 定义一个函数，用于发送网络请求
function fetchPageListData(formData?: any) {
  if (!isQuery) return
  let size = pageSize.value
  let offset = (currentPage.value - 1) * size
  const Info = { size, offset }
  systemStore.postPageListAction(props.contentConfig.pageName, { ...Info, ...formData })
}
// 监听systemStore中的action
systemStore.$onAction(({ name, after }) => {
  // after确保action回调执行完成再回调
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
defineExpose({ fetchPageListData })
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
