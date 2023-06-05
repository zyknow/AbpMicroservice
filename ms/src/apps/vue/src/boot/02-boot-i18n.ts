import { boot } from 'quasar/wrappers'
import messages, { quasarLocalization } from '@/locales'
import { createI18n } from 'vue-i18n'
import { Quasar } from 'quasar'
import { ls } from '@/providers/storage-provider'
export type MessageLanguages = keyof typeof messages
// Type-define 'zh-CN' as the master schema for the resource
export type MessageSchema = (typeof messages)['zh-CN']

/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */
// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition

// export let creatorI18n = undefined

// 用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const t = (key: string) => key

const lang = ls.lang.get() || 'zh-CN'

export const i18n = createI18n({
  locale: lang,
  globalInjection: true,
  messages,
  datetimeFormats: {
    'zh-CN': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    'en-US': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  }
})

export default boot(async ({ app }) => {
  // creatorI18n = i18n
  app.use(i18n)
  Quasar.lang.set(await quasarLocalization[lang]())
})
