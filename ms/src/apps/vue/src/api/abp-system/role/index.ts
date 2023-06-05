import { createBaseCurdApi, createBaseCurdUrl } from '@/api/base/base-curd-api-definition'
import http from '@/utils/http'
import { Role, UpdateRoleInput, CreateRoleInput } from './typing'
const baseUrl = '/api/identity/roles'

const url = {
  ...createBaseCurdUrl(baseUrl),
  getAll: `${baseUrl}/all`
}

export const roleApi = {
  url,
  ...createBaseCurdApi<
    string,
    Role,
    UpdateRoleInput,
    CreateRoleInput,
    FilterPageRequest,
    PageResult<Role>
  >(baseUrl),
  getAll() {
    return http.get<ItemsResult<Role>>(url.getAll)
  }
}
