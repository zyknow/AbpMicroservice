<template>
  <crud-page
    :page-action="tenantCrud.pageAction"
    :localization-module-name="tenantCrud.localizationModuleName"
    :columns="tenantCrud.pageAction.columnDefines"
    @on-create-click="tenantCrud.showCreateDialog()"
    @on-update-click="(row) => tenantCrud.showUpdateDialog(row.id)"
    @on-delete-click="(row) => tenantCrud.deleteAction.invoke(row.id)"
    @on-delete-selected-click="
      tenantCrud.deleteAction.deleteByIds(tenantCrud.pageAction.selected.map((s) => s.id))
    "
  />
  <CrudCreateUpdateDialog
    :create-update-action="tenantCrud.createUpdateAction"
    :localization-module-name="tenantCrud.localizationModuleName"
    @on-submited="
      (res) => {
        if (res.succeeded) {
          tenantCrud.pageAction.invoke()
        }
      }
    "
    :title="tenantCrud.L('Tenants')"
  />
</template>
<script lang="ts" setup>
import CrudCreateUpdateDialog from '@/components/crud-table/create-update/crud-create-update-dialog.vue'
import crudPage from '@/components/crud-table/table/crud-table.vue'
import { createTenantCrud } from '@/cruds/saas/tenant-crud.jsx'
defineOptions({
  name: 'TenantManagement'
})

const tenantCrud = await createTenantCrud({ tableConfigSavingKey: 'TenantManagement' })
</script>
<style lang="scss"></style>
