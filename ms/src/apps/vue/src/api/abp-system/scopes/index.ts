import http from '@/utils/http'
import { createBaseCurdUrl, createBaseCurdApi } from '@/api/base/base-curd-api-definition'
import { CreateScopeInput, Scope, UpdateScopeInput } from './typing'

const baseUrl = '/api/openiddict/scopes'

const url = {
  ...createBaseCurdUrl(baseUrl),
  getAll: `${baseUrl}/all`
}

export const openiddictScopeApi = {
  url,
  ...createBaseCurdApi<
    string,
    Scope,
    UpdateScopeInput,
    CreateScopeInput,
    FilterPageRequest,
    PageResult<Scope>
  >(baseUrl),
  getAll() {
    return http.get<Scope[]>(url.getAll)
  }
}
