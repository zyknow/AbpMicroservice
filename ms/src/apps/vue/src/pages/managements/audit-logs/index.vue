<template>
  <div class="flex flex-col w-full h-full flex-nowrap">
    <q-card class="mt-4 mx-4 flex justify-start" flat>
      <q-tabs dense v-model="state.tab">
        <q-tab :name="TabEnum['audit-logs']" :label="L('AuditLogs')" />
        <q-tab :name="TabEnum['audit-logs-entity-changes']" :label="L('EntityChanges')" />
      </q-tabs>
    </q-card>

    <q-tab-panels
      keep-alive
      v-model="state.tab"
      animated
      swipeable
      vertical
      transition-prev="jump-up"
      transition-next="jump-up"
    >
      <q-tab-panel :name="TabEnum['audit-logs']">
        <log />
      </q-tab-panel>
      <q-tab-panel :name="TabEnum['audit-logs-entity-changes']">
        <entity />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script lang="ts" setup>
import Log from './audit-log.vue'
import Entity from './audit-entity.vue'
import { useLocalization } from '@/hooks/abp/useLocalization'
defineOptions({
  name: 'AuditLogManagement'
})

enum TabEnum {
  'audit-logs' = 'audit-logs',
  'audit-logs-entity-changes' = 'audit-logs-entity-changes'
}

const { L } = useLocalization('AbpAuditLogging')

const state = reactive({
  tab: 'audit-logs' as TabEnum,
  component: Log as any
})
</script>
<style lang="scss"></style>
