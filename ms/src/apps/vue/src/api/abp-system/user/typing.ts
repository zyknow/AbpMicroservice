export interface User extends BaseEntity {
  tenantId?: string | null

  userName?: string | null

  name?: string | null

  // surname?: string | null

  isActive?: boolean

  email?: string | null

  emailConfirmed?: boolean

  phoneNumber?: string | null

  phoneNumberConfirmed?: boolean
}

export type CreateUserInput = Omit<UpdateUserInput, 'concurrencyStamp'>

export interface UpdateUserInput {
  userName: string
  name?: string
  surname?: string
  email: string
  phoneNumber: string
  isActive: boolean
  lockoutEnabled: boolean
  roleNames: string[]
  password: string
  concurrencyStamp: string
}
