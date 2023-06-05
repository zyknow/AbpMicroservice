import { oidcHandler } from '@/utils/oidc'
import { useUserStore } from '@/stores/modules/user'
import { ss } from '@/providers/storage-provider'
import { LoadingBar } from 'quasar'
import { Router, RouteRecordName } from 'vue-router'
import { useAbpStore } from '@/stores/modules/abp'
import { eventBus } from '@/providers/evnet-bus-provider'

const whiteList: RouteRecordName[] = ['SignInCallbackOidc', 'SignOutCallbackOidc']

LoadingBar.setDefaults({
  color: 'blue'
})

export const configRouterGuards = (router: Router) => {
  const userStore = useUserStore()
  const abpStore = useAbpStore()
  const { onCurrentRouterChange } = eventBus

  // oidc handler 优先处理
  router.beforeEach(async (to) => {
    const res = await oidcHandler(to)
    if (res) {
      return res
    }
  })

  // return 和 next 只能使用其中一个，否则就会报错
  router.beforeEach(async (to) => {
    // 白名单路由直接不检查
    if (whiteList.includes(to.name!)) {
      return true
    } else if (!userStore.routers) {
      const oidcInfo = await userStore.getOidcInfo()

      const currentTime = new Date().getTime() / 1000

      if (oidcInfo?.access_token && oidcInfo?.expires_at && oidcInfo.expires_at > currentTime) {
        // 初始化 abp application 配置
        await abpStore.initAbpApplicationConfiguration()
        // 生成路由
        await userStore.generatorRouter(router)
        return { ...to, replace: true }
      } else {
        // ss记录当前访问的路由
        ss.signin_succeeded_to_path.set(to.fullPath)
        // 重定向到oidc登录
        await userStore.loginRedirect()
        return false
      }
    }

    const toPermission = to.meta.abpPermission

    if (toPermission) {
      const auths = userStore.getCurrentUserPermissions

      if (auths) {
        return !!auths[toPermission]
      }
    }

    return true
  })

  router.afterEach((to) => {
    onCurrentRouterChange.emit(to)
  })
}
