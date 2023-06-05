import http from '@/utils/http'
import { ChangePasswordInput, Profile, UpdateProfileInput } from './typing'

const baseUrl = '/api/account/my-profile'

const url = {
  get: baseUrl,
  update: baseUrl,
  changePassword: `${baseUrl}/change-password`
}

export const profileApi = {
  url,
  get() {
    return http.get<Profile>(url.get)
  },
  update(input: UpdateProfileInput) {
    return http.put(url.get, input)
  },
  changePassword(input: ChangePasswordInput) {
    return http.post(url.get, input)
  }
}
