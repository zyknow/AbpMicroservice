import http from '@/utils/http'
import { createBaseCurdUrl, createBaseCurdApi } from '@/api/base/base-curd-api-definition'
import { CreateTenantInput, Tenant, UpdateTenantInput } from './typing'

const baseUrl = '/api/multi-tenancy/tenants'

const url = {
  ...createBaseCurdUrl(baseUrl),
  getAll: `${baseUrl}/all`,
  getConnectionString: `${baseUrl}/{id}/default-connection-string`,
  updateConnectionString: `${baseUrl}/{id}/default-connection-string`,
  deleteConnectionString: `${baseUrl}/{id}/default-connection-string`
}

export const tenantApi = {
  url,
  ...createBaseCurdApi<
    string,
    Tenant,
    UpdateTenantInput,
    CreateTenantInput,
    FilterPageRequest,
    PageResult<Tenant>
  >(baseUrl),
  getConnectionString(id: string) {
    return http.get<string>(url.getConnectionString.format({ id }))
  },
  updateConnectionString(id: string, defaultConnectionString: string) {
    return http.put<string>(
      url.updateConnectionString.format({ id }),
      {},
      { params: { defaultConnectionString } }
    )
  },
  deleteConnectionString(id: string) {
    return http.delete<string>(url.deleteConnectionString.format({ id }))
  }
}
