import { paginationToPageRequest } from '@/utils/abp'
import { BaseCrudTableConfigSaving } from '../base/base-table-config'
import { ColumnType, FieldFilterOption } from '../base/typing'
import { CrudOptions, BaseAction, InternalAxiosResultType } from './base'

export type TableColumnDefineType<TDto> = (ColumnType<TDto> | (keyof TDto | '__actions'))[]

type OptionsType<TPageRequest> = CrudOptions<
  Omit<TPageRequest, keyof BasePageRequest>,
  FieldFilterOption & {
    component?: (data: { input: TPageRequest; getInputElementProps: () => any }) => VNodeComponent
  }
>

type PageResultType<TDto> = Promise<
  AxiosResultType<InternalAxiosResultType<PageResult<TDto>>> | undefined
>

class PageAction<TPageRequest, TDto, TOptions = OptionsType<TPageRequest>> extends BaseAction<
  TPageRequest,
  PageResult<TDto>,
  TOptions
> {
  selected: TDto[] = []
  visibleColumns: string[] = []
  loading = false
  items: TDto[] = []
  pagination: Pagination = {
    sortBy: '',
    descending: false,
    rowsPerPage: 15,
    page: 1,
    rowsNumber: 0,
    totalPages: 0
  }
  columnDefines: TableColumnDefineType<TDto>
  tableConfigSaving?: BaseCrudTableConfigSaving

  /**
   *
   */
  constructor(
    columnDefines: TableColumnDefineType<TDto>,
    getPageMethod: (...params) => PageResultType<TDto>,
    options: TOptions
  ) {
    super(getPageMethod, options as any)
    this.columnDefines = columnDefines
    this.initVisibleColumns()

    onBeforeUnmount(() => {
      this.tableConfigSaving?.saveTableOption(this.pagination.rowsPerPage, this.visibleColumns)
    })
  }

  private initVisibleColumns() {
    for (const column of this.columnDefines) {
      if (column === '__actions' || column['field'] === '__actions') continue

      if (typeof column === 'string') {
        if (column === '__actions') continue
        this.visibleColumns.push(column)
      } else {
        this.visibleColumns.push(column['field'])
      }
    }
  }

  override async invoke(...params): PageResultType<TDto> {
    this.loading = true
    this.setPageRequestByPagination(this.pagination)

    if (params.length == 0) params = [this.input]
    const res = await super.invoke(...params)
    this.setPaginationByPageResult(res)
    this.loading = false
    this.items = res?.data.items || []
    return res
  }

  setPageRequestByPagination(pagination: Pagination) {
    this.input = paginationToPageRequest(this.input!, pagination) as any
  }

  setPaginationByPageResult(items?: AxiosResultType<InternalAxiosResultType<PageResult<TDto>>>) {
    if (items?.data.items) {
      this.pagination.totalPages = Math.ceil(items!.data.totalCount / this.pagination.rowsPerPage)
      this.pagination.rowsNumber = items!.data.totalCount
    }
  }
  loadTableConfigSaving(savingKey?: string) {
    if (!savingKey?.length) return

    this.tableConfigSaving = new BaseCrudTableConfigSaving(savingKey!)

    const cachingVisibleColumns = this.tableConfigSaving.getTableOption()?.visibleColumns
    if (cachingVisibleColumns?.length) {
      this.visibleColumns = cachingVisibleColumns!
    }

    const cachingPaginationRowsPerPage = this.tableConfigSaving.getTableOption()?.rowsPerPage

    if (cachingPaginationRowsPerPage) {
      this.pagination.rowsPerPage = cachingPaginationRowsPerPage
    }
  }
}

export function create_PageAction<TPageRequest, TDto>(
  getPageMethod: (...params) => PageResultType<TDto>,
  { columns, request }: { columns: TableColumnDefineType<TDto>; request: OptionsType<TPageRequest> }
) {
  return reactive(new PageAction<TPageRequest, TDto>(columns, getPageMethod, request))
}

export type PageActionType<TPageRequest = any, TDto = any> = ReturnType<
  typeof create_PageAction<TPageRequest, TDto>
>
