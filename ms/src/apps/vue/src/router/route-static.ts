const router: AppRouteRecordRaw[] = [
  {
    name: '',
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/Error404.vue')
  }
]

export default router
