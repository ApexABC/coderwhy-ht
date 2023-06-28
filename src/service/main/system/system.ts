import hyRequest from '@/service'

export function reqUsersList(queryInfo: any) {
  return hyRequest.post({ url: '/users/list', data: queryInfo })
}
export function reqDeleteUser(userId: number) {
  return hyRequest.delete({ url: `/users/${userId}` })
}
// 新建用户
export function reqNewUser(userInfo: any) {
  return hyRequest.post({ url: '/users', data: userInfo })
}
// 编辑用户
export function reqEditUser(id: number, userInfo: any) {
  return hyRequest.patch({ url: `/users/${id}`, data: userInfo })
}

// ------------针对页面的增删改查
export function reqPageList(pageName: string, queryInfo: any) {
  return hyRequest.post({ url: `/${pageName}/list`, data: queryInfo })
}
export function reqPageUser(pageName: string, id: number) {
  return hyRequest.delete({ url: `/${pageName}/${id}` })
}
export function reqNewPageData(pageName: string, pageInfo: any) {
  return hyRequest.post({ url: `/${pageName}`, data: pageInfo })
}
export function reqEditPageData(pageName: string, id: number, pageInfo: any) {
  return hyRequest.patch({ url: `/${pageName}/${id}`, data: pageInfo })
}
