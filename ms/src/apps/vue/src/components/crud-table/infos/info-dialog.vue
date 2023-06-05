<template>
  <q-dialog v-model="info.visible" full-width>
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">{{ L('Detail') }} {{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup class="top-0 right-0" />
      </q-card-section>
      <q-card-section class="row items-center gap-4">
        <InfoDetails :data="info.data" :visible-fields="(info.options as [])">
          <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
            <slot :name="item" v-bind="data"></slot>
          </template>
        </InfoDetails>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { InformationActionType } from '../types/information-action'
import { useLocalization } from '@/hooks/abp/useLocalization'

const props = defineProps<{
  infoAction: InformationActionType
  title?: string
}>()

const { L } = useLocalization()

const info = computed(() => props.infoAction)
</script>
<style lang="sass" scoped></style>
