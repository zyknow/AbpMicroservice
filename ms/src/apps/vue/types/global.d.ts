declare type NameValue<T> = {
  name: string
  value: T
}

declare type Pagination = {
  sortBy: string
  descending: boolean
  /**
   * 单页item数
   */
  rowsPerPage: number
  /**
   * 当前页
   */
  page: number
  /**
   * 总item数
   */
  rowsNumber: number
  /**
   * 总页数
   */
  totalPages: number
}
