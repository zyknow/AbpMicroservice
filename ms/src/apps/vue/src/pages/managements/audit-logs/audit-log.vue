<template>
  <crud-page
    :page-action="pageAction"
    :localization-module-name="localizationModuleName"
    :columns="pageAction.columnDefines"
    :hidden-default-btns="['create', 'delete']"
  />

  <info-dialog :info-action="infoAction" />
</template>
<script lang="ts" setup>
import InfoDialog from '@/components/crud-table/infos/info-dialog.vue'
import crudPage from '@/components/crud-table/table/crud-table.vue'
import { createAuditLogCrud } from '@/cruds/audit/audit-logs-crud.jsx'
defineOptions({
  name: 'AuditLogManagement'
})

const { pageAction, localizationModuleName, infoAction } = await createAuditLogCrud({
  tableConfigSavingKey: 'AuditLogManagement'
})
</script>
<style lang="scss"></style>
