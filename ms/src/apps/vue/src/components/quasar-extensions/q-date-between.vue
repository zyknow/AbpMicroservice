<template>
  <div class="flex flex-row items-center">
    <QDateTime
      :model-value="startDate"
      @update:model-value="(v) => $emit('update:startDate', v)"
      v-bind="({ ...commonElementBinding , ...startDateElementBinding } as any)"
    />
    <slot>
      <div class="bg-gray-100 dark:bg-[#2d2d2d] w-2 min-h-6"></div>
    </slot>
    <QDateTime
      :model-value="endDate"
      @update:model-value="(v) => $emit('update:endDate', v)"
      v-bind="({ ...commonElementBinding, ...endDateElementBinding } as any)"
    />
  </div>
</template>
<script lang="ts">
import QDateTime from './q-date-time.vue'

type QDateTimeType = InstanceType<typeof QDateTime>

type BindingType = Omit<QDateTimeType['$props'], 'modelValue' | 'label'> & {
  label?: ComputedRef<string> | string
}

export default defineComponent({
  name: 'QDateBetween',
  components: {
    QDateTime
  },
  props: {
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    commonElementBinding: {
      type: Object as PropType<BindingType>,
      default: () => ({})
    },
    startDateElementBinding: {
      type: Object as PropType<BindingType>,
      default: () => ({})
    },
    endDateElementBinding: {
      type: Object as PropType<BindingType>,
      default: () => ({})
    }
  },
  emits: ['update:startDate', 'update:endDate'],
  setup() {
    return {}
  }
})
</script>
<style lang="sass" scoped></style>
