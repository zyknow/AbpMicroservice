export interface Profile {
  extraProperties: {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
  }
  userName: string
  email: string
  name: string
  surname: string
  phoneNumber: string
  isExternal: boolean
  hasPassword: boolean
  concurrencyStamp: string
}

export interface UpdateProfileInput {
  userName: string
  email: string
  name: string
  surname: string
  phoneNumber: string
  concurrencyStamp: string
}

export interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
}
