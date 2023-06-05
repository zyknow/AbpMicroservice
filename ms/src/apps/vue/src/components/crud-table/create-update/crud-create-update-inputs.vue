<template>
  <div class="space-y-5">
    <div v-for="key in getFieldKeys" :key="key">
      <slot
        :name="key"
        :props="{
          label: options[key].label || DL(key),
          options: options[key],
          input: input
        }"
      >
        <component
          v-if="options[key].component"
          :is="options[key].component!({
            input,
            label:(options[key].label || DL(key)) as any,
            getInputElementProps: ()=> getEasyInputProps(key)
            
          })"
        />

        <div v-else class="space-y-1">
          <component
            v-if="options[key].labelComponent"
            :is="options[key].labelComponent!({
            input,label:(options[key].label || DL(key)) as any,
            getInputElementProps: ()=> getEasyInputProps(key)
          })"
          />
          <span v-else-if="!showLabelOnEasyInputTypes.includes(options[key].type)">{{
            options[key].label || DL(key)
          }}</span>

          <component
            v-if="options[key].inputComponent"
            :is="options[key].inputComponent!({
            input,label:(options[key].label || DL(key)) as any,
            getInputElementProps: ()=> getEasyInputProps(key)
          })"
          />
          <easy-input v-else-if="options[key]" v-bind="{ ...getEasyInputProps(key) as any }" />
        </div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLocalization } from '@/hooks/abp/useLocalization'
import { CreateActionType, UpdateActionType } from '../types/create-update-action'
type CuOptionType = CreateActionType | UpdateActionType

const props = defineProps<{
  cuOptions: CuOptionType
  localizationModuleName?: string
}>()

const input = props.cuOptions.input as any

const options = computed(() => props.cuOptions.options)

const showLabelOnEasyInputTypes = ['checkBox']

const { DL } = useLocalization(props.localizationModuleName)

const getEasyInputProps = (key: string) => {
  return {
    dense: true,
    outlined: true,
    ...options.value[key],
    label: showLabelOnEasyInputTypes.includes(options.value[key].type)
      ? options.value[key].label || DL(key)
      : undefined,
    field: key,
    type: options.value[key].type || 'text',
    clearable: true,
    modelValue: input[key],
    'onUpdate:modelValue': (val: any) => {
      input[key] = val
    },
    betweenSecondModelValue: input[options.value[key]['betweenSecondField']],
    'onUpdate:between-second-model-value': (val: any) => {
      input[options.value[key]['betweenSecondField']] = val
    }
  }
}

const getFieldKeys = computed(() => {
  const fields = Object.keys(options.value || {})

  return fields
})
</script>
<style lang="sass" scoped></style>
