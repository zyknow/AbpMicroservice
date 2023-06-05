<template>
  <slot name="pre"></slot>
  <div v-for="key in getFieldKeys" :key="key">
    <slot
      :name="`input-${key}`"
      :label="defaultFieldMap[key] || options[key].label || DL(key)"
      :options="options[key]"
      :input="input"
      :field="key"
    >
      <component
        v-if="options[key].component"
        :is="options[key].component!({
          input,
          getInputElementProps: ()=> getEasyInputProps(key)
        })"
      />
      <easy-input v-else-if="options[key]" v-bind="{ ...getEasyInputProps(key) as any }" />
    </slot>
  </div>

  <slot name="post"></slot>
</template>
<script lang="ts" setup>
import { useLocalization } from '@/hooks/abp/useLocalization'
import { PageActionType } from '../types/page-action'
const $emit = defineEmits(['onSearch'])

const props = defineProps<{
  pageAction: PageActionType
  localizationModuleName?: string
  inputClass?: string
  btnClass?: string
}>()

const input = props.pageAction.input as any

const options = computed(() => props.pageAction.options)

const abpuiL = useLocalization('AbpUi').L
const { DL } = useLocalization(props.localizationModuleName)

const defaultFieldMap = computed(() => {
  return {
    filter: abpuiL('PagerSearch')
  }
})

const getEasyInputProps = (key: string) => {
  return {
    dense: true,
    filled: true,
    ...options.value[key],
    class: options.value[key]['class'],
    label: defaultFieldMap.value[key] || options.value[key].label || DL(key),
    field: key,
    type: options.value[key].type,
    modelValue: input[key],
    'onUpdate:modelValue': (val: any) => {
      input[key] = val
    },

    betweenSecondModelValue: input[options.value[key]['betweenSecondField']],
    'onUpdate:between-second-model-value': (val: any) => {
      input[options.value[key]['betweenSecondField']] = val
    },
    'keydown.enter': () => {
      $emit('onSearch')
    },
    clearable: true,
    commonElementBinding: {
      ...{
        dense: true,
        filled: true
      },
      ...options.value[key]['commonElementBinding']
    }
  }
}

const ignoreFields = ['maxResultCount', 'skipCount', 'sorting']

const getFieldKeys = computed(() => {
  const fields = Object.keys(options.value || {}).filter((key) => !ignoreFields.includes(key))
  return fields
})
</script>
<style lang="sass" scoped></style>
