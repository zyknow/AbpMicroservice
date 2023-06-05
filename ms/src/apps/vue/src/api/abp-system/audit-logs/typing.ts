export interface AuditLog {
  extraProperties: any
  id: string
  userId: string
  userName: string
  tenantId: string
  tenantName: string
  impersonatorUserId: string
  impersonatorUserName: string
  impersonatorTenantId: string
  impersonatorTenantName: string
  executionTime: string
  executionDuration: number
  clientIpAddress: string
  clientName: string
  browserInfo: string
  httpMethod: string
  url: string
  exceptions: string
  comments: string
  httpStatusCode: number
  applicationName: string
  correlationId: string
  entityChanges: AuditEntityChange[]
  actions: AuditAction[]
}

export interface AuditLogPageRequest extends BasePageRequest {
  startTime?: string
  endTime?: string
  url?: string
  userName?: string
  applicationName?: string
  clientIpAddress?: string
  correlationId?: string
  httpMethod?: string
  httpStatusCode?: number
  maxExecutionDuration?: number
  minExecutionDuration?: number
  hasException?: boolean
}

export interface AuditEntityChangePageRequest extends BasePageRequest {
  auditLogId?: string
  entityChangeType?: AuditEntityChangeType
  entityId?: string
  entityTypeFullName?: string
  startDate?: string
  endDate?: string
}

export interface AuditEntityChange {
  extraProperties: any
  id: string
  auditLogId: string
  tenantId: string
  changeTime: string
  changeType: AuditEntityChangeType
  entityId: string
  entityTypeFullName: string
  propertyChanges: [
    {
      id: string
      tenantId: string
      entityChangeId: string
      newValue: string
      originalValue: string
      propertyName: string
      propertyTypeFullName: string
    }
  ]
}

export enum AuditEntityChangeType {
  created,
  updated,
  deleted
}

export interface AuditAction {
  extraProperties: any
  id: string
  tenantId: string
  auditLogId: string
  serviceName: string
  methodName: string
  parameters: string
  executionTime: string
  executionDuration: number
}
