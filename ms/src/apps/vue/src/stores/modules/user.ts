import { oidcManager } from '@/utils/oidc'
import routeDynamic from '@/router/route-dynamic'
import generatorDynamicRouter from '@/router/router-generator'
import { defineStore } from 'pinia'
import { Router, RouteRecordRaw } from 'vue-router'
import { useAbpStore } from './abp'
interface UserStore {
  routers?: AppRouteRecordRaw[]
  token?: string
  avatar?: string
}

export const useUserStore = defineStore('User', {
  state: (): UserStore => ({
    routers: undefined,
    avatar: ''
  }),
  getters: {
    getCurrentUser: () => useAbpStore().application.currentUser,
    getCurrentTantent: () => useAbpStore().application.currentTenant,
    getCurrentUserDisplayName() {
      const { currentUser, currentTenant } = useAbpStore().application
      if (currentTenant?.name) return `${currentTenant.name}/${currentUser.name}`
      else return currentUser.name
    },
    getCurrentUserPermissions: () => useAbpStore().application.auth.grantedPolicies
  },
  actions: {
    async getOidcInfo() {
      return await oidcManager.getUser()
    },

    async logoutRedirect() {
      await oidcManager.signoutRedirect()
    },

    async loginRedirect() {
      await oidcManager.signinRedirect()
    },

    async generatorRouter(router: Router) {
      const allRouters = generatorDynamicRouter(routeDynamic(), this.getCurrentUserPermissions)
      allRouters?.forEach((route) => {
        router.addRoute(route as RouteRecordRaw)
      })
      if (allRouters?.length) this.routers = allRouters[0]?.children
      return allRouters
    }
  }
})
