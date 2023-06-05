import http from '@/utils/http'
import { PermissionGroup, UpdatePermissionInput } from './typing'

const baseurl = '/api/permission-management/permissions'

const url = {
  get: baseurl,
  update: baseurl
}

export const permissionsApi = {
  url,
  get(providerName: string, providerKey: string) {
    return http.get<PermissionGroup>(url.get, { params: { providerName, providerKey } })
  },
  update(providerName: string, providerKey: string, updatePermissionInput: UpdatePermissionInput) {
    return http.put<PermissionGroup>(url.update, updatePermissionInput, {
      params: { providerName, providerKey }
    })
  }
}
