export interface RegisterAccountInput {
  userName: string
  emailAddress: string
  password: string
  appName: string
}

export type SendPasswordResetCodeInput = RegisterAccountInput
