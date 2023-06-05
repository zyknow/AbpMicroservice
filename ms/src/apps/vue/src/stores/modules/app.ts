import { SupportLangType } from '@/locales'
import { ls } from '@/providers/storage-provider'
import { defineStore } from 'pinia'
import { Dark, Screen } from 'quasar'
import { useAbpStore } from './abp'
interface AppStore {
  config: {
    multiTab: {
      // 是否开启多标签页
      enabled: boolean
    }
    header: {
      // 头部固定
      reveal: boolean
    }
    sider: {
      mini: boolean
      collapse: boolean
      // mini 模式为叠加
      miniToOverlay: boolean
      // 宽度
      width: number
      // 断点宽度
      breakpoint: number
    }
    theme: {
      // 暗黑模式
      dark?: boolean
    }
  }
  lang: SupportLangType
  tenantId?: string
}

export const useAppStore = defineStore('App', {
  state: (): AppStore => ({
    config: {
      multiTab: {
        enabled: false
      },
      header: {
        reveal: false
      },
      sider: {
        mini: false,
        collapse: false,
        miniToOverlay: false,
        width: 250,
        breakpoint: Screen.sizes.sm
      },
      theme: {
        dark: false
      }
    },
    lang: ls.lang.get() || 'zh-CN'
  }),
  actions: {
    setLanguage(lang: SupportLangType) {
      this.lang = lang
      ls.lang.set(lang)

      useAbpStore().initAbpApplicationConfiguration()
    },
    setSiderDisplay(show: boolean) {
      const sider = this.config.sider
      if (this.isMobileWidth) {
        sider.collapse = show
      } else {
        sider.mini = show
      }
    },
    setDark(dark: boolean) {
      Dark.set(dark)
      if (dark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      this.config.theme.dark = dark
    }
  },
  getters: {
    isMobileWidth: (state) => {
      return Screen.width <= state.config.sider.breakpoint
    },
    getSideDisplay(state) {
      const sider = state.config.sider
      if (this.isMobileWidth) {
        return !sider.collapse
      } else {
        return !sider.mini
      }
    }
  }
})
