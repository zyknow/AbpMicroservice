import { i18n } from '@/boot/02-boot-i18n'
import { BaseAction, InternalAxiosResultType } from './base'

export class DeleteAction<TInput = number | string, TDto = any> extends BaseAction<
  TInput,
  TDto,
  any
> {
  override enabledConfirmation = true

  /**
   *
   */
  constructor(
    deleteMethod: (...params) => Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>
  ) {
    super(deleteMethod, {} as any)
  }

  override async invoke(
    ...params: any[]
  ): Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined> {
    const res = await super.invoke(...params)
    return res
  }

  async deleteByIds(
    ids: (string | number)[]
  ): Promise<(AxiosResultType<InternalAxiosResultType<TDto>> | undefined)[] | undefined> {
    const deleteRes: (AxiosResultType<InternalAxiosResultType<TDto>> | undefined)[] = []

    const { t } = i18n.global as any

    if (!ids?.length) return

    if (
      !(await this.showConfirmDialog({
        title: t('confirm.deleteConfirmManyTitle'),
        messages: t('confirm.deleteConfirmManyMessage', { count: ids?.length })
      }))
    ) {
      return undefined
    }

    const originEnabledConfirmation = this.enabledConfirmation

    this.enabledConfirmation = false

    for (const id of ids) {
      const res = await this.invoke(id)
      deleteRes.push(res)
    }

    this.enabledConfirmation = originEnabledConfirmation

    return deleteRes
  }

  protected override async showConfirmDialog({
    title,
    messages
  }: {
    title?: string | undefined
    messages?: string | undefined
  } = {}): Promise<boolean> {
    await nextTick()
    const { t } = i18n.global as any
    title ??= t('confirm.deleteConfirmTitle')
    messages ??= t('confirm.deleteConfirmMessage')
    return super.showConfirmDialog({ title, messages })
  }
}

export function create_DeleteAction<TInput = any, TDto = any>(
  deleteMethod: (...params) => Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>
) {
  return reactive(new DeleteAction<TInput, TDto>(deleteMethod))
}

export type DeleteActionType<TInput = any, TDto = any> = ReturnType<
  typeof create_DeleteAction<TInput, TDto>
>
