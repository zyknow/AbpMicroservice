<template>
  <q-input
    v-if="type === 'number' || type === 'text'"
    :model-value="modelValue"
    :type="type"
    @update:model-value="(v) => $emit('update:modelValue', v)"
    :rules="(getRules as any)"
  />
  <q-input
    v-else-if="type === 'password'"
    :model-value="modelValue"
    :type="state.isPwd ? 'password' : 'text'"
    @update:model-value="(v) => $emit('update:modelValue', v)"
    :rules="(getRules as any)"
  >
    <template #append>
      <q-icon
        :name="state.isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="state.isPwd = !state.isPwd"
      />
    </template>
  </q-input>
  <QDateTime
    v-else-if="type === 'date'"
    :model-value="modelValue"
    @update:model-value="(v) => $emit('update:modelValue', v)"
    :rules="(getRules as any)"
  />
  <q-checkbox
    v-else-if="type === 'checkBox'"
    :model-value="modelValue"
    @update:model-value="(v) => $emit('update:modelValue', v)"
    :rules="getRules"
  />
  <q-select
    v-else-if="type === 'select'"
    :model-value="modelValue"
    @update:model-value="(v) => $emit('update:modelValue', v)"
    :rules="(getRules as any)"
  />
  <QDateBetween
    v-else-if="type === 'date-between'"
    :startDate="modelValue"
    :endDate="betweenSecondModelValue"
    @update:start-date="(v) => $emit('update:modelValue', v)"
    @update:end-date="(v) => $emit('update:betweenSecondModelValue', v)"
    :rules="getRules"
  />
  <QNumberBetween
    v-else-if="type === 'number-between'"
    :min="modelValue"
    :max="betweenSecondModelValue"
    @update:min="(v) => $emit('update:modelValue', v)"
    @update:max="(v) => $emit('update:betweenSecondModelValue', v)"
    :rules="getRules"
  />
</template>
<script lang="ts">
import { FieldFilterType } from '@/components/crud-table/base/typing'
import { ValidationCrudRuleType, useVaildation } from '@/hooks/web/useValidation'
import {
  GlobalComponentConstructor,
  QCheckboxProps,
  QCheckboxSlots,
  QInputProps,
  QInputSlots,
  QSelectProps,
  QSelectSlots,
  ValidationRule
} from 'quasar'
import QDateTime from '@/components/quasar-extensions/q-date-time.vue'
import QDateBetween from '@/components/quasar-extensions/q-date-between.vue'
import QNumberBetween from '@/components/quasar-extensions/q-number-between.vue'
import { VNodeProps } from 'vue'

type QDateBetweenProps = Omit<
  InstanceType<typeof QDateBetween>['$props'],
  'modelValue' | keyof VNodeProps
>

type QNumberBetweenProps = Omit<
  InstanceType<typeof QNumberBetween>['$props'],
  'modelValue' | keyof VNodeProps
>

const components = defineComponent({
  name: 'EasyInput',
  components: {
    QDateTime,
    QDateBetween,
    QNumberBetween
  },
  props: {
    modelValue: {
      type: [Object, String, Number, Date] as PropType<any | string | Number | Date>
    },
    betweenSecondModelValue: {
      type: [Object, String, Number, Date] as PropType<any | string | Number | Date>
    },
    type: {
      type: String as () => FieldFilterType,
      default: 'text'
    },
    rules: {
      type: Function as unknown as () => (
        r: ValidationCrudRuleType
      ) => (Boolean | string)[] | (Boolean | string) | ValidationRule[],
      default: undefined
    },
    ruleSpace: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'onSearch', 'update:betweenSecondModelValue'],
  setup(props) {
    const state = reactive({
      isPwd: true
    })
    const { CrudR } = useVaildation()

    const getRules = computed(() => {
      if (!props?.rules) return props.ruleSpace ? [() => true] : undefined
      if (props.rules instanceof Array) {
        return props.rules
      }
      const rules = props.rules(CrudR)
      if (rules instanceof Array) return rules
      return [rules]
    })
    return {
      state,
      getRules
    }
  }
})

export default components as unknown as typeof components &
  (
    | ({
        type: 'number' | 'text' | 'date' | 'password'
      } & GlobalComponentConstructor<Omit<QInputProps, 'type'>, QInputSlots>)
    | ({
        type: 'checkBox'
      } & GlobalComponentConstructor<QCheckboxProps, QCheckboxSlots>)
    | ({
        type: 'select'
      } & GlobalComponentConstructor<QSelectProps, QSelectSlots>)
    | ({
        type: 'dateBetween'
      } & GlobalComponentConstructor<QDateBetweenProps>)
    | ({
        type: 'numberBetween'
      } & GlobalComponentConstructor<QNumberBetweenProps>)
  )
</script>
<style lang="sass" scoped></style>
