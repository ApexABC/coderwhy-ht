import { reqEntireDepartments, reqEntireRoles, reqEntireMenus } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartment: any[]
  entireMenus: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartment: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleResult = await reqEntireRoles()
      const departmentResult = await reqEntireDepartments()
      const menusResult = await reqEntireMenus()
      this.entireRoles = roleResult.data.list
      this.entireDepartment = departmentResult.data.list
      this.entireMenus = menusResult.data.list
    }
  }
})

export default useMainStore
