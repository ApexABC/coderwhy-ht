import hyRequest from '..'

export function reqEntireRoles() {
  return hyRequest.post({ url: '/role/list' })
}
export function reqEntireDepartments() {
  return hyRequest.post({ url: '/department/list' })
}
export function reqEntireMenus() {
  return hyRequest.post({ url: '/menu/list' })
}
