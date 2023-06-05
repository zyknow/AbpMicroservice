import http from '@/utils/http'
import { AuditEntityChange, AuditLog, AuditLogPageRequest } from './typing'

const baseUrl = '/api/audit-logging/audit-logs'

const url = {
  getPage: `${baseUrl}`,
  getById: `${baseUrl}/{id}`,
  getEntityChangePage: `${baseUrl}/entity-changes`,
  getEntityChangeById: `${baseUrl}/entity-changes/{entityChangeId}`
}

export const auditLogApi = {
  url,
  getPage(req: AuditLogPageRequest) {
    return http.get<PageResult<AuditLog>>(url.getPage, { params: req })
  },
  getById(id: string) {
    return http.get<AuditLog>(url.getById.format({ id }))
  },
  getEntityChangePage(req: AuditLogPageRequest) {
    return http.get<PageResult<AuditEntityChange>>(url.getEntityChangePage, { params: req })
  },
  getEntityChangeById(entityChangeId: string) {
    return http.get<AuditEntityChange>(url.getEntityChangeById.format({ entityChangeId }))
  }
}
