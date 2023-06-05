import http from '@/utils/http'
import { SecurityLog, SecurityLogPageRequest } from './typing'

const baseUrl = '/api/identity/security-logs'

const url = {
  getById: `${baseUrl}`,
  getPage: `${baseUrl}`
}

export const securityLogApi = {
  router: url,
  getById(id: string) {
    return http.get<SecurityLog>(`${baseUrl}/${id}`)
  },
  getPage(pageRequest: SecurityLogPageRequest) {
    return http.get<PageResult<SecurityLog>>(baseUrl, { params: pageRequest })
  }
}
