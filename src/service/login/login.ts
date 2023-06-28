import type { IAccount } from '@/types'
import hyRequest from '..'
export const reqAccountLogin = (account: IAccount) =>
  hyRequest.post({
    url: '/login',
    data: account
  })

// 获取角色信息
export const reqUserInfoById = (id: number) =>
  hyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: localCache.getCache('token')
    // }
  })
// 按照角色获取对应菜单
export const reqUserMenusByRoleId = (id: number) =>
  hyRequest.get({
    url: `/role/${id}/menu`
  })
