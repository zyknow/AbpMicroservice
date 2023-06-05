<template>
  <div class="grid grid-cols-5 grid-rows-2">
    <div class="font-bold">
      <slot :name="`name-${field}`" v-bind="{ ...props }">
        {{ displayName }}
      </slot>
    </div>

    <div>
      <slot :name="`value-${field}`" v-bind="{ ...props }">
        {{ displayValue }}
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  field?: string
  displayName: any
  displayValue: any
}>()
</script>
<style lang="sass" scoped></style>
