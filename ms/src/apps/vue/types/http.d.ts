import { AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
declare global {
  declare type Recordable<T = any> = Record<string, T>

  interface ResponseBody<T = any> {
    message: string
    code: number
    data?: T | T[]
  }

  type NameValue<TValue> = {
    name: string
    value: TValue
  }

  interface AxiosResultData {
    notifyOnErr(context?: string, opt?: QNotifyCreateOptions): boolean
    notify(context?: string, opt?: QNotifyCreateOptions): boolean
    error?: ErrorResult
    succeeded: boolean
  }

  type AxiosResultType<R> = R & AxiosResultData

  interface AxiosInstance {
    (config: AxiosRequestConfig): AxiosPromise
    (url: string, config?: AxiosRequestConfig): AxiosPromise
    defaults: AxiosRequestConfig
    interceptors: {
      request: AxiosInterceptorManager<AxiosRequestConfig>
      response: AxiosInterceptorManager<AxiosResponse>
    }
    getUri(config?: AxiosRequestConfig): string
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<AxiosResultType<R>>
    get<T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResultType<R>>
    delete<T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResultType<R>>
    head<T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResultType<R>>
    options<T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResultType<R>>
    post<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResultType<R>>
    put<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResultType<R>>
    patch<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResultType<R>>
  }

  interface BaseEntity<TId = string> {
    id: TId

    isDeleted: boolean

    deleterId?: string | null

    deletionTime?: string | null

    lastModificationTime?: string | null

    lastModifierId?: string | null

    creationTime: string

    creatorId?: string | null

    // tenantId?: string | null
  }

  interface BasePageRequest {
    sorting?: string
    skipCount?: number
    maxResultCount?: number
  }

  interface FilterPageRequest extends BasePageRequest {
    filter?: string
  }

  interface ItemsResult<TEntity = any> {
    items: TEntity[]
  }

  interface PageResult<TEntity = any> extends ItemsResult<TEntity> {
    totalCount: number
  }

  interface ErrorResult<TData = { [key: string]: any }> {
    code: string
    message: string
    details: string
    data?: TData
    validationErrors: [
      {
        message: string
        members: [string]
      }
    ]
    validationErrorMaps: { [key: string]: string }
  }
}
