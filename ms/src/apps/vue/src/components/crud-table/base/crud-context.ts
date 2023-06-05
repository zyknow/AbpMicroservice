import { InternalAxiosResultType } from '../types/base'

interface CrudContext<TInput, TResult = any> {
  input: TInput
  next: boolean
  extends: { [key: string]: any }
  result?: TResult

  setResultErrorMessages(message: string[] | string): void
}

export type CrudInvokeContext<TInput, TDto> = CrudContext<
  TInput,
  AxiosResultType<InternalAxiosResultType<TDto>>
>
