export interface SecurityLog {
  id: string
  creationTime: string
  creatorId: string
  lastModificationTime: string
  lastModifierId: string
  tenantId: string
  applicationName: string
  identity: string
  actionName: string
  userId: string
  userName: string
  tenantName: string
  clientId: string
  correlationId: string
  clientIpAddress: string
  browserInfo: string
}

export interface SecurityLogPageRequest extends BasePageRequest {
  startTime?: string
  endTime?: string
  applicationName?: string
  identity?: string
  actionName?: string
  userName?: string
  clientId?: string
  correlationId?: string
}
