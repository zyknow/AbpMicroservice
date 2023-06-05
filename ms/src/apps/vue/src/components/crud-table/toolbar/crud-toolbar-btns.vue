<template>
  <q-btn
    v-if="!hiddenDefaultBtns?.includes('search')"
    :loading="pageAction.loading"
    color="primary"
    :label="defaultFieldMap.filter"
    @click="$emit('onSearch')"
  />
  <q-btn
    v-if="!hiddenDefaultBtns?.includes('create')"
    color="primary"
    :label="$t('global.create')"
    @click="$emit('onCreateClick')"
  />
  <q-btn
    v-if="!hiddenDefaultBtns?.includes('delete')"
    color="red"
    :label="$t('global.delete')"
    @click="$emit('onDeleteClick')"
  />
</template>
<script lang="ts" setup>
import { PageActionType } from '../types/page-action'
import { useLocalization } from '@/hooks/abp/useLocalization'
import { HiddenDefaultBtnType } from './typing'
const $emit = defineEmits(['onDeleteClick', 'onCreateClick', 'onSearch'])

defineProps<{
  pageAction: PageActionType
  hiddenDefaultBtns: HiddenDefaultBtnType[]
}>()

const abpuiL = useLocalization('AbpUi').L

const defaultFieldMap = computed(() => {
  return {
    filter: abpuiL('PagerSearch')
  }
})
</script>
<style lang="sass" scoped></style>
