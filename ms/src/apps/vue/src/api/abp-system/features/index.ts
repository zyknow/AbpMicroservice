import http from '@/utils/http'
import { FeatureGroup, UpdateFeatureInput } from './typing'

const baseUrl = '/api/feature-management/features'

const url = {
  default: baseUrl,
  get: baseUrl,
  update: baseUrl,
  delete: baseUrl
}

export const featuresApi = {
  url,
  get(providerName: string, providerKey: string) {
    return http.get<FeatureGroup>(url.get, { params: { providerName, providerKey } })
  },
  update(providerName: string, providerKey: string, updateFeatureInput: UpdateFeatureInput) {
    return http.put(url.update, updateFeatureInput, { params: { providerName, providerKey } })
  },
  delete(providerName: string, providerKey: string) {
    return http.delete(url.delete, { params: { providerName, providerKey } })
  }
}
