import type { RouteRecordRaw } from 'vue-router'
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes: RouteRecordRaw[] = []
  // eager表示立马获取，不要懒加载
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    // console.log(module.default)
    localRoutes.push(module.default)
  }
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 给外层菜单增加的重定向规则
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu) firstMenu = submenu
    }
  }

  return routes
}
export function mapPathToMenus(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu.id + ''
      }
    }
  }
}
interface Ibreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: Ibreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadcrumbs
}
export function mapMenusToIds(menuList: any) {
  const IdList: any[] = []
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        IdList.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return IdList
}
export function mapMenusToPermissions(menuList: any) {
  const permissionList: string[] = []
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissionList.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  // for (const itemX of menuList) {
  //   for (const itemY of itemX.children ?? []) {
  //     for (const itemZ of itemY.children ?? []) {
  //       permissionList.push(itemZ.permission)
  //     }
  //   }
  // }
  return permissionList
}
