import { createBaseCurdApi } from '@/api/base/base-curd-api-definition'
import { FieldFilterOption } from '../base/typing'
import { AxiosResponse } from 'axios'
import { i18n } from '@/boot/02-boot-i18n'
import { Dialog } from 'quasar'
import { CrudInvokeContext } from '../base/crud-context'

export type InternalAxiosResultType<TDto> = AxiosResultType<AxiosResponse<TDto>>

export type ActionInvokeResult<TDto> = Promise<AxiosResultType<InternalAxiosResultType<TDto>>>

export type CrudDefaultMethodName = keyof ReturnType<
  typeof createBaseCurdApi<any, any, any, any, any, any>
>

interface BaseInvoke<TDto> {
  invoke(...params): Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>
}

export abstract class BaseAction<TInput, TDto = any, TOptions = any> implements BaseInvoke<TDto> {
  input: TInput = {} as TInput
  options: TOptions
  enabledConfirmation = false

  preInvokes: ((input: CrudInvokeContext<TInput, TDto>) => void)[] = []
  postInvokes: ((input: CrudInvokeContext<TInput, TDto>) => void)[] = []
  method: (...params) => Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>

  constructor(
    method: (...params) => Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>,
    options: TOptions
  ) {
    this.method = method
    this.options = options

    this.initDefaultInputByOptions()
  }

  protected initDefaultInputByOptions() {
    for (const key in this.options) {
      const option = this.options[key]
      this.input[key as any] = option['value']

      if ('betweenSecondField' in (option as any)) {
        this.input[option['betweenSecondField'] as any] = option['betweenSecondValue']
      }
    }
  }

  public async invoke(
    ...params
  ): Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined> {
    const context: CrudInvokeContext<TInput, TDto> = {
      next: true,
      input: this.input,
      extends: {},
      setResultErrorMessages: (message: string) => {
        if (context?.result) {
          context.result = {
            error: {
              code: 'preInvokeError',
              message: message,
              details: message
            }
          } as any
        } else {
          context.result!.error!.message = message
        }
      }
    }

    const isConfirm = await this.showConfirmDialog()
    if (!isConfirm) return

    for (const preInvoke of this.preInvokes) {
      await preInvoke(context)
      if (!context.next) return context.result
    }

    if (!context?.next) return undefined

    this.preInvokeStringTrimHandler()

    context.result = await this.method(...params)

    for (const postInvoke of this.postInvokes) {
      await postInvoke(context)
      if (!context.next) return context.result
    }

    if (!this.postInvokes?.length) {
      this.defaultRequestErrorHandler(context.result)
    }
    return context.result
  }

  private preInvokeStringTrimHandler() {
    const input = this.input as any
    for (const key in input) {
      const value = input[key]
      if (typeof value === 'string') {
        input[key] = value.trim()
      }
    }
  }

  protected defaultRequestErrorHandler(res?: AxiosResultType<InternalAxiosResultType<TDto>>): void {
    res?.notifyOnErr()
  }

  protected async showConfirmDialog({
    title,
    messages
  }: { title?: string; messages?: string } = {}): Promise<boolean> {
    const { t } = i18n.global as any

    return new Promise((resolve) => {
      if (this.enabledConfirmation) {
        Dialog.create({
          title: title || t('confirm.defaultConfirmTitle'),
          message: messages || t('confirm.defaultConfirmMessage'),
          ok: {
            color: 'green',
            flat: true
          },
          cancel: {
            flat: true
          }
        })
          .onOk(() => {
            resolve(true)
          })
          .onCancel(() => {
            resolve(false)
          })
          .onDismiss(() => {
            resolve(false)
          })
      } else resolve(true)
    })
  }
}

export type CrudOptions<
  TInput,
  TValue = FieldFilterOption & {
    component?: (data: {
      input: TInput
      label: string
      getInputElementProps: () => any
    }) => VNodeComponent
    labelComponent?: (data: {
      input: TInput
      label: string
      getInputElementProps: any
    }) => VNodeComponent
    inputComponent?: (data: {
      input: TInput
      label: string
      getInputElementProps: any
    }) => VNodeComponent
  }
> = {
  [key in keyof Omit<TInput, 'concurrencyStamp'>]: TValue
}

export function getHttpMethod<TInput = any, TDto = any>(
  api: any,
  defaultMethodName: CrudDefaultMethodName,
  inputMethod?:
    | string
    | ((dto: TInput) => ActionInvokeResult<TDto>)
    | ((dto: TInput) => ActionInvokeResult<PageResult<TDto>>)
) {
  if (inputMethod === 'string') {
    return api[inputMethod]
  } else if (typeof inputMethod === 'function') {
    return inputMethod
  } else if (!inputMethod) {
    return api[defaultMethodName]
  }
}
