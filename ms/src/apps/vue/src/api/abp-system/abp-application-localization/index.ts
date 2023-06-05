import http from '@/utils/http'

const baseUrl = '/api/abp/application-localization'

const url = {
  get: baseUrl
}
export const abpApplicationLocalizationApi = {
  url,
  get(cultureName: string, onlyDynamics?: boolean) {
    return http.get<{ resources: any }>(url.get, {
      params: { cultureName, onlyDynamics }
    })
  }
}
