import { localCache } from '@/utlis/cache'
import { firstMenu } from '@/utlis/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'
// 引入组件
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/main' },
    { path: '/login', component: () => import('@/views/login/Login.vue') },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/Main.vue')
    },
    { path: '/:pathMatch(.*)', component: () => import('@/views/not-found/NotFound.vue') }
  ]
})
// const localRoutes = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('@/views/main/analysis/overview/overview.vue')
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('@/views/main/system/role/role.vue')
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('@/views/main/system/user/user.vue')
//   }
// ]
// // 动态添加路由
// router.addRoute('main', localRoutes[0])
// router.addRoute('main', localRoutes[1])
// 路由守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache('token')
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})
export default router
