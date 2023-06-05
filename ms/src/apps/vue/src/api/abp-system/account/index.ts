import http from '@/utils/http'
import { User } from '../user/typing'
import { RegisterAccountInput, SendPasswordResetCodeInput } from './typing'

const baseUrl = '/api/account'

const url = {
  register: `${baseUrl}/register`,
  sendPasswordResetCode: `${baseUrl}/send-password-reset-code`,
  verifyPasswordResetToken: `${baseUrl}/verify-password-reset-token`,
  resetPassword: `${baseUrl}/resetPassword`
}

export const accountApi = {
  router: url,
  register(input: RegisterAccountInput) {
    return http.post<User>(url.register, input)
  },
  sendPasswordResetCode(input: SendPasswordResetCodeInput) {
    return http.post(url.sendPasswordResetCode, input)
  },
  verifyPasswordResetToken(input: {
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    resetToken: 'string'
  }) {
    return http.post(url.verifyPasswordResetToken, input)
  },
  resetPassword(input: {
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    resetToken: 'string'
    password: 'string'
  }) {
    return http.post(url.resetPassword, input)
  }
}
