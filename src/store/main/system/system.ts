import {
  reqEditUser,
  reqNewUser,
  reqUsersList,
  reqDeleteUser,
  reqPageList,
  reqPageUser,
  reqNewPageData,
  reqEditPageData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import useMainStore from '../main'
interface IsystemState {
  userList: any[]
  totalCount: number
  pageList: any[]
  pageTotalCount: number
}
const useSystemStote = defineStore('system', {
  state: (): IsystemState => ({
    userList: [],
    totalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async getUserListAction(queryInfo: any) {
      const usersResult = await reqUsersList(queryInfo)
      const { totalCount, list } = usersResult.data
      this.userList = list
      this.totalCount = totalCount
    },
    async getDeleteUser(id: number, cPage: any) {
      const result = await reqDeleteUser(id)
      if (result.code === 1) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
      }
      this.getUserListAction({ offset: cPage, size: 10 })
    },
    async getNewUser(userInfo: any) {
      await reqNewUser(userInfo)
      this.getUserListAction({ offset: 0, size: 10 })
    },
    async getEditUser(id: number, userInfo: any) {
      await reqEditUser(id, userInfo)
      this.getUserListAction({ offset: 0, size: 10 })
    },

    // 针对页面数据进行增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await reqPageList(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const result = await reqPageUser(pageName, id)
      if (result.code === 1) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
      }
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 删除后重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      await reqNewPageData(pageName, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 新建后重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      await reqEditPageData(pageName, id, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 编辑后重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStote
