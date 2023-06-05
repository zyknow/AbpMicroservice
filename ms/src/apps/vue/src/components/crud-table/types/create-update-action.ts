import { i18n } from '@/boot/02-boot-i18n'
import { AxiosResponse } from 'axios'
import { cloneDeep } from 'lodash'
import { BaseAction, InternalAxiosResultType, CrudOptions } from './base'

class CreateAction<TInput, TDto, TOptions = CrudOptions<TInput>> extends BaseAction<
  TInput,
  TDto,
  TOptions
> {
  /**
   *
   */
  constructor(
    createMethod: (
      ...params
    ) => Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>,
    options: TOptions
  ) {
    super(createMethod, options)
    this.initDefaultInputByOptions()
  }
  private defaultInput!: TInput

  protected override initDefaultInputByOptions(): void {
    super.initDefaultInputByOptions()
    this.defaultInput = cloneDeep(this.input)
  }

  resetInput(resetInput?: TInput) {
    this.input = resetInput || cloneDeep(this.defaultInput)
    return this.input
  }
}

export function create_CreateAction<TInput, TDto, TOptions = CrudOptions<TInput>>(
  createMethod: (...params) => Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>,
  options: TOptions
) {
  return reactive(new CreateAction<TInput, TDto, TOptions>(createMethod, options))
}

export type CreateActionType<TInput = any, TDto = any, TOptions = CrudOptions<TInput>> = ReturnType<
  typeof create_CreateAction<TInput, TDto, TOptions>
>

class UpdateAction<TInput, TDto, TOptions = CrudOptions<TInput>> extends BaseAction<
  TInput,
  TDto,
  TOptions
> {
  /**
   *
   */
  constructor(
    updateMethod: (
      ...params
    ) => Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>,
    options: TOptions
  ) {
    super(updateMethod, options)
    // this.getByIdMethod = getByIdMethod
  }
  updateId!: string | number
  override invoke(
    ...params: any[]
  ): Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined> {
    return super.invoke(...params, this.updateId)
  }

  protected override async showConfirmDialog({
    title,
    messages
  }: {
    title?: string | undefined
    messages?: string | undefined
  } = {}): Promise<boolean> {
    const { t } = i18n.global as any
    title = t('confirm.updateConfirmTitle')
    messages = t('confirm.updateConfirmMessage')
    return super.showConfirmDialog({ title, messages })
  }
}

export function create_UpdateAction<TInput, TDto, TOptions = CrudOptions<TInput>>(
  updateMethod: (...params) => Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>,
  options: TOptions
) {
  return reactive(new UpdateAction<TInput, TDto, TOptions>(updateMethod, options))
}

export type UpdateActionType<TInput = any, TDto = any, TOptions = CrudOptions<TInput>> = ReturnType<
  typeof create_UpdateAction<TInput, TDto, TOptions>
>

class CreateUpdateAction<TCreateInput, TUpdateInput, TDto> {
  updateAction!: UpdateActionType<TUpdateInput, TDto>

  createAction!: CreateActionType<TCreateInput, TDto>
  visible = false

  constructor(
    updateAction: UpdateActionType<TUpdateInput, TDto>,
    createAction: CreateActionType<TCreateInput, TDto>
  ) {
    this.updateAction = updateAction
    this.createAction = createAction
  }

  get type(): string {
    return this._type
  }
  private _type: 'create' | 'update' = 'create'

  get input(): TUpdateInput | TCreateInput {
    return (this._type === 'create' ? this.createAction.input : this.updateAction.input) as any
  }

  get currentAction(): UpdateActionType<TUpdateInput, TDto> | CreateActionType<TCreateInput, TDto> {
    if (this.type === 'create') {
      return this.createAction
    } else {
      return this.updateAction
    }
  }

  showCreate() {
    this.setType('create')
  }

  async showUpdate(
    id: string | number,
    defaultInputOrGetByIdMethod:
      | (TUpdateInput | TDto)
      | ((id: string | number) => Promise<AxiosResultType<AxiosResponse<TDto, any>>>)
  ) {
    this.updateAction.updateId = id

    if (defaultInputOrGetByIdMethod instanceof Function) {
      const getUpdateInputRes = await defaultInputOrGetByIdMethod(id)
      getUpdateInputRes.notifyOnErr()

      if (getUpdateInputRes.succeeded) {
        this.updateAction.input = getUpdateInputRes.data as any
      }
    } else this.updateAction.input = defaultInputOrGetByIdMethod as TUpdateInput as any
    this.setType('update')
  }

  private setType(type: 'create' | 'update', show = true) {
    this._type = type
    if (this._type === 'create') {
      this.createAction.resetInput()
    }
    this.visible = show
  }
}

export function create_CreateUpdateAction<TCreateInput, TUpdateInput, TDto>(
  updateAction: UpdateActionType<TUpdateInput, TDto>,
  createAction: CreateActionType<TCreateInput, TDto>
) {
  return reactive(new CreateUpdateAction(updateAction, createAction))
}

export type CreateUpdateActionType<TCreateInput = any, TUpdateInput = any, TDto = any> = ReturnType<
  typeof create_CreateUpdateAction<TCreateInput, TUpdateInput, TDto>
>
