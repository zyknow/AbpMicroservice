import http from '@/utils/http'
const baseUrl = '/api/abp/application-configuration'

const url = {
  get: baseUrl
}

export const abpApplicationConfigurationApi = {
  url,
  get(includeLocalizationResources?: boolean) {
    return http.get<ApplicationConfigurationDto>(url.get, {
      params: { includeLocalizationResources }
    })
  }
}
