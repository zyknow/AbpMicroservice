// export const pageResultToPagination()
// {

import { Pagination } from '@/components/crud/typing'

// }

export const paginationToPageRequest = (pageRequest: BasePageRequest, pagination: Pagination) => {
  let sort = pagination?.sortBy
  if (sort?.length) {
    sort += ` ${pagination.descending ? 'desc' : 'asc'}`
  }

  pageRequest.skipCount = (pagination.page - 1) * pagination.rowsPerPage || 0
  pageRequest.sorting = sort
  pageRequest.maxResultCount = pagination.rowsPerPage
  return pageRequest
}
