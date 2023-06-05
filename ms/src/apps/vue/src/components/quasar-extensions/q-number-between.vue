<template>
  <div class="flex flex-row items-center">
    <q-input
      :model-value="min"
      type="number"
      @update:model-value="(v) => $emit('update:min', v)"
      v-bind="({ ...commonElementBinding, ...minElementBinding } as any)"
    />
    <slot>
      <div class="bg-gray-100 dark:bg-[#2d2d2d] w-2 min-h-6"></div>
    </slot>
    <q-input
      :model-value="max"
      type="number"
      @update:model-value="(v) => $emit('update:max', v)"
      v-bind="({ ...commonElementBinding, ...maxElementBinding }as any)"
    />
  </div>
</template>
<script lang="ts">
import { QInputProps } from 'quasar'

type BindingType = Omit<QInputProps, 'modelValue' | 'label'> & {
  label?: ComputedRef<string> | string
}
export default defineComponent({
  name: 'QDateBetween',
  components: {},
  props: {
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    dateTimeClass: {
      type: String,
      default: ''
    },
    commonElementBinding: {
      type: Object as PropType<BindingType>,
      default: () => ({})
    },
    minElementBinding: {
      type: Object as PropType<BindingType>,
      default: () => ({})
    },
    maxElementBinding: {
      type: Object as PropType<BindingType>,
      default: () => ({})
    }
  },
  emits: ['update:min', 'update:max'],
  setup() {
    return {}
  }
})
</script>
<style lang="sass" scoped></style>
