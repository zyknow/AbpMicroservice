import enUS from './define/en-US'
import zhCN from './define/zh-CN'

import qZhCN from 'quasar/lang/zh-CN.mjs'
import qEnUS from 'quasar/lang/en-US.mjs'

export type SupportLangType = 'zh-CN' | 'en-US'

export const supportLangs: { [key in SupportLangType]: string } = {
  'zh-CN': '简体中文',
  'en-US': 'English'
}

export const quasarLocalization: { [key in SupportLangType]: () => any } = {
  'zh-CN': () => qZhCN,
  'en-US': () => qEnUS
}

export default {
  'en-US': enUS,
  'zh-CN': zhCN
} as { [key in SupportLangType]: any }
