import http from '@/utils/http'
import { Role } from '../role/typing'
import { createBaseCurdUrl, createBaseCurdApi } from '@/api/base/base-curd-api-definition'
import { CreateUserInput, UpdateUserInput, User } from './typing'

const baseUrl = '/api/identity/users'

const url = {
  ...createBaseCurdUrl(baseUrl),
  getUserRoles: `${baseUrl}/{userId}/roles`,
  updateUserRoles: `${baseUrl}/{userId}/roles`,
  getAssignableRoles: `${baseUrl}/assignable-roles`,
  getByUserName: `${baseUrl}/by-username/{userName}`,
  getByEmail: `${baseUrl}/by-email/{userEmail}`
}

export const userApi = {
  url,
  ...createBaseCurdApi<
    string,
    User,
    UpdateUserInput,
    CreateUserInput,
    FilterPageRequest,
    PageResult<User>
  >(baseUrl),
  getUserRoles(userId: string) {
    return http.get<ItemsResult<Role>>(url.getUserRoles.format({ userId }))
  },
  updateUserRoles(userId: string, roleNames: string[]) {
    return http.put(url.updateUserRoles.format({ userId }), roleNames)
  },
  getAssignableRoles() {
    return http.get<ItemsResult<Role>>(url.getAssignableRoles)
  },
  getByUserName(userName: string) {
    return http.get<User>(url.getByUserName.format({ userName }))
  },
  getByEmail(userEmail: string) {
    return http.get<User>(url.getByEmail.format({ userEmail }))
  }
}
