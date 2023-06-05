import http from '@/utils/http'
import { UserLookup } from './typing'

const defaultUrl = '/api/identity/users/lookup'

const url = {
  getById: `${defaultUrl}/{id}`,
  getByUserName: `${defaultUrl}/by-username/{userName}`,
  search: `${defaultUrl}/search`,
  getCount: `${defaultUrl}/count`
}

export const userLookupApi = {
  url,
  getById(id: string) {
    return http.get<UserLookup>(url.getById.format({ id }))
  },
  getByUserName(userName: string) {
    return http.get<UserLookup>(url.getByUserName.format({ userName }))
  },
  search(pageRequest: FilterPageRequest) {
    return http.get<ItemsResult<UserLookup>>(url.search, { params: pageRequest })
  },
  getCount(filter: string) {
    return http.get<number>(url.getCount, { params: { filter } })
  }
}
