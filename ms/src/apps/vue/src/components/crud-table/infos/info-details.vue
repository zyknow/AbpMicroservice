<template>
  <div v-if="data" class="w-full">
    <div v-for="(item, key) in fields" :key="key" class="w-full">
      <component
        v-if="item.component"
        :is="item.component({ row: data, label: DL(item.field), value: data[item.field] })"
      />
      <info-item
        v-else
        :key="item.field"
        :display-name="DL(item.field)"
        :display-value="data[item.field]"
        :field="item.field"
        class="w-full"
      >
        <template #[`name-${item.field}`]="_data">
          <slot :name="`name-${item.field}`" v-bind="_data">
            <component
              v-if="item.displayNameComponent"
              :is="
                item.displayNameComponent({
                  row: data,
                  label: DL(item.field),
                  value: data[item.field]
                })
              "
            />
          </slot>
        </template>

        <template #[`value-${item.field}`]="_data">
          <slot :name="`value-${item.field}`" v-bind="_data">
            <component
              v-if="item.displayValueComponent"
              :is="
                item.displayValueComponent({
                  row: data,
                  label: DL(item.field),
                  value: data[item.field]
                })
              "
            />
          </slot>
        </template>

        <!-- <template #[`name-${item.field}`] v-if="item.displayNameComponent">
          <component :is="item.displayNameComponent!(data,DL(item.field),data[item.field])" />
        </template>

        <template #[`value-${item.field}`] v-if="item.displayValueComponent">
          <component :is="item.displayValueComponent!(data,DL(item.field),data[item.field])" />
        </template>

        <template v-for="item in Object.keys($slots)" #[item]="_data" :key="item"> </template> -->
      </info-item>
      <q-separator />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLocalization } from '@/hooks/abp/useLocalization'
import { InformationVisibleFieldType } from '../types/information-action'

const props = defineProps<{
  data: any
  localizationModuleName?: string
  visibleFields?: InformationVisibleFieldType
}>()

const { DL } = useLocalization(props.localizationModuleName)

const fields = computed(() => {
  const visibleFields = [] as {
    field: string
    component?: (data: { row: any; label: string; value: string }) => VNodeComponent
    displayNameComponent?: (data: { row: any; label: string; value: string }) => VNodeComponent
    displayValueComponent?: (data: { row: any; label: string; value: string }) => VNodeComponent
  }[]

  if (props.visibleFields) {
    for (const field of props.visibleFields) {
      if (typeof field === 'string') {
        visibleFields.push({
          field
        })
      } else {
        visibleFields.push(field as any)
      }
    }
  } else {
    Object.keys(props.data)?.forEach((d) => visibleFields.push({ field: d }))
  }
  return visibleFields
})
</script>
<style lang="sass" scoped></style>
