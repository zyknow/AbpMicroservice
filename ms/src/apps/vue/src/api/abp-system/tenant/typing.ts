export interface Tenant {
  id: string
  name: string
  concurrencyStamp: string
  extraProperties: any
}

export interface CreateTenantInput {
  name: string
  adminEmailAddress: string
  adminPassword: string
}

export interface UpdateTenantInput {
  name: string
  concurrencyStamp: string
}
