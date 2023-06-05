import { createBaseCurdUrl, createBaseCurdApi } from '@/api/base/base-curd-api-definition'
import { Application, CreateApplicationInput, UpdateApplicationInput } from './typing'

const baseUrl = '/api/openiddict/applications'

const url = {
  ...createBaseCurdUrl(baseUrl)
}

export const openiddictApplicationApi = {
  url,
  ...createBaseCurdApi<
    string,
    Application,
    UpdateApplicationInput,
    CreateApplicationInput,
    FilterPageRequest,
    PageResult<Application>
  >(baseUrl)
}
