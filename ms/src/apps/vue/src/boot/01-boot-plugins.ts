import { useUserStore } from './../stores/modules/user'
import { isDev } from './../utils/index'
import { useAppStore } from '@/stores/modules/app'
import { boot } from 'quasar/wrappers'

// windicss
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import { eventBus } from '@/providers/evnet-bus-provider'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $isMobileWidth: boolean
    $eventBus: typeof eventBus
    $isDev: boolean
    $appStore: ReturnType<typeof useAppStore>
    $userStore: ReturnType<typeof useUserStore>
  }
}

export default boot(async ({ app }) => {
  // eventBus
  app.config.globalProperties.$eventBus = eventBus
  app.config.globalProperties.$appStore = useAppStore()
  app.config.globalProperties.$userStore = useUserStore()
  app.config.globalProperties.$isDev = isDev
})
