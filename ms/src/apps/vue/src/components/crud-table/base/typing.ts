import qDateBetweenVue from '@/components/quasar-extensions/q-date-between.vue'
import qNumberBetweenVue from '@/components/quasar-extensions/q-number-between.vue'
import { ValidationCrudRuleType } from '@/hooks/web/useValidation'
import { QCheckboxProps, QInputProps, QSelectProps, QTableProps, ValidationRule } from 'quasar'
import { HTMLAttributes, VNodeProps } from 'vue'

export type FieldFilterType =
  | 'number'
  | 'text'
  | 'date'
  | 'checkBox'
  | 'select'
  | 'password'
  | 'date-between'
  | 'number-between'

type DefaultFieldFilterOption = {
  value?: any
  label?: ComputedRef<string> | string
  labelClass?: string
  rules?: (
    r: ValidationCrudRuleType
  ) => (Boolean | string)[] | (Boolean | string) | ValidationRule[] | ValidationRule
} & HTMLAttributes

type QDateBetweenProps = Omit<
  InstanceType<typeof qDateBetweenVue>['$props'],
  | 'modelValue'
  | keyof VNodeProps
  | keyof HTMLAttributes
  | 'onUpdate:startDate'
  | 'onUpdate:endDate'
  | 'startDate'
  | 'endDate'
>

type QNumberBetweenProps = Omit<
  InstanceType<typeof qNumberBetweenVue>['$props'],
  | 'modelValue'
  | keyof VNodeProps
  | keyof HTMLAttributes
  | 'onUpdate:min'
  | 'onUpdate:max'
  | 'min'
  | 'max'
>

export type FieldFilterOption =
  | ({
      type: 'number' | 'text' | 'date' | 'password'
    } & DefaultFieldFilterOption &
      Omit<QInputProps, 'modelValue' | 'rules' | 'type' | 'label'>)
  | ({
      type: 'checkBox'
    } & DefaultFieldFilterOption &
      Omit<QCheckboxProps, 'modelValue' | 'rules' | 'type' | 'label'>)
  | ({
      type: 'select'
    } & DefaultFieldFilterOption &
      Omit<QSelectProps, 'modelValue' | 'rules' | 'type' | 'label'>)
  | ({
      type: 'date-between'
    } & {
      betweenSecondField: string
      betweenSecondValue?: string
    } & DefaultFieldFilterOption &
      Omit<QDateBetweenProps, 'modelValue' | 'rules' | 'type' | 'label'>)
  | ({
      type: 'number-between'
    } & {
      betweenSecondField: string
      betweenSecondValue?: number
    } & DefaultFieldFilterOption &
      Omit<QNumberBetweenProps, 'modelValue' | 'rules' | 'type' | 'label'>)

type ArrayItemType<T extends any[]> = T extends Array<infer U> ? U : never

type RemoveUndefined<T> = T extends undefined ? never : T
export type ColumnType<TRow = any> = Omit<
  ArrayItemType<RemoveUndefined<QTableProps['columns']>>,
  'name' | 'label' | 'field'
> & {
  label?: string
  field: keyof TRow | '__actions'
} & {
  component?: (data: { row: TRow }) => VNodeComponent
}
