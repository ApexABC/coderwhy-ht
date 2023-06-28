import { reqAccountLogin, reqUserMenusByRoleId, reqUserInfoById } from '@/service/login/login'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'
import { localCache } from '@/utlis/cache'
import router from '@/router'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utlis/map-menus'
import useMainStore from '../main/main'
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const result = await reqAccountLogin(account)
      const id = result.data.id
      this.token = result.data.token
      localCache.setCache('token', this.token) //要在获取用户信息之前携带token
      // 获取用户的详细信息
      const userInfoResult = await reqUserInfoById(id)
      this.userInfo = userInfoResult.data
      // 根据角色分配用户菜单
      const userMeunResult = await reqUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMeunResult.data
      // 设置localStorage
      localCache.setCache('userInfo', userInfoResult.data)
      localCache.setCache('userMenus', userMeunResult.data)
      // 请求roles和Department数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      // 获取登录用户所有按钮的权限
      const permission = mapMenusToPermissions(this.userMenus)
      this.permissions = permission
      // 动态添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      // 跳转页面
      router.push('/main')
    },
    loadLocalCacheAction() {
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        // 请求roles和Department数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        // 获取登录用户所有按钮的权限
        const permission = mapMenusToPermissions(this.userMenus)
        this.permissions = permission
        // 动态添加路由
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
