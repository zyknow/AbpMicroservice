import http from '@/utils/http'
import { AbpTenantGetByNameOrIdResult } from './typing'

const baseUrl = '/abp/multi-tenancy/tenants'

const url = {
  getByName: `${baseUrl}/by-name`,
  getById: `${baseUrl}/by-id`
}

export const abpTenantApi = {
  url,
  getByName: (name: string) =>
    http.get<AbpTenantGetByNameOrIdResult>(url.getByName, { params: { name } }),
  getById: (id: string) => http.get<AbpTenantGetByNameOrIdResult>(url.getByName, { params: { id } })
}
