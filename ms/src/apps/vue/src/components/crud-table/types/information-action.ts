import { BaseAction, InternalAxiosResultType } from './base'

export type InformationVisibleFieldType<TDto = any> = (
  | keyof TDto
  | {
      field: keyof TDto
      component?: (data: { row: TDto; label: string; value: any }) => VNodeComponent
      displayNameComponent?: (data: { row: TDto; label: string; value: any }) => VNodeComponent
      displayValueComponent?: (data: { row: TDto; label: string; value: any }) => VNodeComponent
    }
)[]

class InformationAction<TDto> extends BaseAction<
  string | number,
  TDto,
  InformationVisibleFieldType<TDto> | undefined
> {
  visible = false
  data?: TDto
  constructor(
    getInfoMethod: (
      ...params
    ) => Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>,
    visibleFields?: InformationVisibleFieldType<TDto> | undefined
  ) {
    super(getInfoMethod, visibleFields)
  }

  protected override initDefaultInputByOptions(): void {}

  async showById(id: string | number) {
    this.visible = true
    // await nextTick()
    const res = await this.invoke(id)

    res?.notifyOnErr()

    if (!res?.succeeded) {
      this.visible = false
      return
    }

    this.data = res.data
  }
}

export function create_InformationAction<TDto>(
  getInfoMethod: (...params) => Promise<AxiosResultType<InternalAxiosResultType<TDto>> | undefined>,
  visibleFields?: InformationVisibleFieldType<TDto> | undefined
) {
  return reactive(new InformationAction<TDto>(getInfoMethod, visibleFields))
}

export type InformationActionType<TDto = any> = ReturnType<typeof create_InformationAction<TDto>>
