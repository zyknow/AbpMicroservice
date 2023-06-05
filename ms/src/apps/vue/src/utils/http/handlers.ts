import { oidcManager } from '@/utils/oidc'
import { notify } from '@/utils/notify'
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useAppStore } from '@/stores/modules/app'
import { i18n } from '@/boot/02-boot-i18n'

const langMap = {
  'zh-CN': 'zh-Hans'
}

const getLang = (lang: string) => {
  return langMap[lang] || lang || langMap['zh-CN']
}

const AUTH_HEADER_KEY = 'Authorization'

// 异常拦截处理器
const errorHandler = async (error: AxiosError): Promise<any> => {
  const { t } = i18n.global as any
  const res = handlerResponse(error.response as AxiosResponse)
  if (res) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status } = res
    // 403 无权限
    // if (status === 403) {
    //   notify.error('Forbidden', { caption: '无权限', position: 'top-right' })
    // }
    // 401 未登录/未授权
    if (status === 401) {
      notify.error('Unauthorized', { caption: t('auth.401Unauthorized'), position: 'top-right' })
      // oidcManager.signinRedirect()
    }
  }

  return res
}
// 响应拦截器
const responseHandler = (
  response: AxiosResponse
): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any => {
  return handlerResponse(response)
}

// 请求拦截器
const requestHandler = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig<any>> => {
  const user = await oidcManager.getUser()
  if (user?.access_token) {
    config.headers[AUTH_HEADER_KEY] = `Bearer ${user?.access_token}`
  }

  const appStore = useAppStore()

  config.headers!['Accept-Language'] = getLang(appStore.lang)
  console.log(appStore.lang)

  return config
}

const handlerResponse = (response: AxiosResponse) => {
  const { t } = i18n.global as any

  const res = response as AxiosResponse & AxiosResultData
  if (res) {
    if (res.status != 200) {
      if (res.data.error) res.error = res.data.error
      res.data = undefined
    } else res.error = undefined

    res.notify = (context, opt) => {
      if (res.error) {
        notify.error(
          context || res.error.details || res.error.message || t('global.oprationFailed'),
          opt
        )
      } else {
        notify.success(context || t('global.oprationSuccessfully'), opt)
      }
      return !res.error
    }

    res.notifyOnErr = (context, opt) => {
      if (res.error) {
        notify.error(
          context || res.error.details || res.error.message || t('global.oprationFailed'),
          opt
        )
      }
      return !res.error
    }

    res.succeeded = !res.error

    if (res.error?.validationErrors) {
      res.error.validationErrorMaps = {}
      for (const errorDetail of res.error.validationErrors) {
        res.error.validationErrorMaps[errorDetail.members[0] as string] = errorDetail.message
      }
    }
  }

  return res
}

export const registerHttpHandler = (http: AxiosInstance) => {
  http.interceptors.request.use(requestHandler, errorHandler)
  http.interceptors.response.use(responseHandler, errorHandler)
}
