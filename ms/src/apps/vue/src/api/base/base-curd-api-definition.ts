import http from '@/utils/http'

export const createBaseCurdApi = <
  TId,
  TEntity,
  TUpdateInputEntity,
  TCreateInputEntity = Omit<TUpdateInputEntity, 'concurrencyStamp'>,
  TPageRequest = BasePageRequest,
  TPageResult = PageResult<TEntity>
>(
  baseUrl: string
) => {
  return {
    getById(id: TId) {
      return http.get<TEntity>(`${baseUrl}/${id}`)
    },
    getPage(pageRequest: TPageRequest) {
      return http.get<TPageResult>(baseUrl, { params: pageRequest })
    },
    update(input: TUpdateInputEntity, id: TId) {
      return http.put<TEntity>(`${baseUrl}/${id}`, input)
    },
    delete(id: TId) {
      return http.delete(`${baseUrl}/${id}`)
    },
    create(input: TCreateInputEntity) {
      return http.post<TEntity>(`${baseUrl}`, input)
    }
  }
}

export const createBaseCurdUrl = (baseUrl: string) => {
  return {
    getById: `${baseUrl}/{id}`,
    getPage: `${baseUrl}/{id}`,
    update: `${baseUrl}/{id}`,
    delete: `${baseUrl}/{id}`,
    create: `${baseUrl}/{id}`
  }
}
