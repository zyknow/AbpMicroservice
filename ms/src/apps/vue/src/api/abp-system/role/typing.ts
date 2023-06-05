export interface Role {
  name: string
  isDefault: boolean
  isStatic: boolean
  isPublic: boolean
  concurrencyStamp: string
  id: string
  extraProperties: any
}

export type CreateRoleInput = Omit<UpdateRoleInput, 'concurrencyStamp'>

export interface UpdateRoleInput {
  name: string
  isDefault: boolean
  isPublic: boolean
  concurrencyStamp: string
}
