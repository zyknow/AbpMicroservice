<template>
  <crud-page
    :page-action="pageAction"
    :localization-module-name="localizationModuleName"
    :columns="pageAction.columnDefines"
    @on-create-click="showCreateDialog()"
    @on-update-click="(row) => showUpdateDialog(row.id)"
    @on-delete-click="(row) => deleteAction.invoke(row.id)"
    @on-delete-selected-click="deleteAction.deleteByIds(pageAction.selected.map((s) => s.id))"
  >
    <template #pre-actions="{ row }">
      <q-btn dense color="primary" icon="manage_accounts" @click="showPermissionDialog(row.name)" />
    </template>
  </crud-page>
  <CrudCreateUpdateDialog
    :create-update-action="createUpdateAction"
    :localization-module-name="localizationModuleName"
    @on-submited="
      (res) => {
        if (res.succeeded) {
          pageAction.invoke()
        }
      }
    "
    :title="L('Roles')"
  />

  <q-dialog v-model="permissionState.dialogVisible" persistent>
    <PermissionAssign
      provider-name="R"
      :provider-key="permissionState.providerKey"
      @on-submit-succeeded="permissionState.dialogVisible = false"
    />
  </q-dialog>
</template>
<script lang="ts" setup>
import CrudCreateUpdateDialog from '@/components/crud-table/create-update/crud-create-update-dialog.vue'
import crudPage from '@/components/crud-table/table/crud-table.vue'
import PermissionAssign from '@/components/permissions/permission-assign.vue'
import { createRoleCrud } from '@/cruds/identity/role-crud.jsx'
defineOptions({
  name: 'IdentityRoleManagement'
})
const permissionState = reactive({
  dialogVisible: false,
  providerName: '',
  providerKey: ''
})

const showPermissionDialog = async (roleName: any) => {
  permissionState.providerKey = roleName
  permissionState.dialogVisible = true
}

const {
  L,
  pageAction,
  createUpdateAction,
  showUpdateDialog,
  showCreateDialog,
  deleteAction,
  localizationModuleName
} = await createRoleCrud({ tableConfigSavingKey: 'IdentityRolerManagement' })
</script>
<style lang="scss"></style>
