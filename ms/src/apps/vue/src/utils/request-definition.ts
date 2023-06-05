import { AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import { QNotifyCreateOptions } from 'quasar'

export interface RequestResultData {
  notifyOnErr(context?: string, opt?: QNotifyCreateOptions): boolean
  notify(context?: string, opt?: QNotifyCreateOptions): boolean
  error?: ErrorResult
  succeeded: boolean
}

export type AxiosResultType<R> = R & RequestResultData

export interface RequestInstance {
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
