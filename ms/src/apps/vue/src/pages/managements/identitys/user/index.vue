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
      <q-btn dense color="primary" icon="manage_accounts" @click="showPermissionDialog(row.id)" />
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
    :title="L('Users')"
  />

  <q-dialog v-model="permissionState.dialogVisible" persistent>
    <PermissionAssign
      provider-name="U"
      :provider-key="permissionState.providerKey"
      @on-submit-succeeded="permissionState.dialogVisible = false"
    />
  </q-dialog>
</template>
<script lang="ts" setup>
import CrudCreateUpdateDialog from '@/components/crud-table/create-update/crud-create-update-dialog.vue'
import crudPage from '@/components/crud-table/table/crud-table.vue'
import { createUserCrud } from '@/cruds/identity/user-crud.jsx'
import PermissionAssign from '@/components/permissions/permission-assign.vue'
defineOptions({
  name: 'IdentityUserManagement'
})

const permissionState = reactive({
  dialogVisible: false,
  providerName: '',
  providerKey: ''
})

const showPermissionDialog = (userId: string) => {
  permissionState.dialogVisible = true
  permissionState.providerKey = userId
}

const {
  L,
  pageAction,
  localizationModuleName,
  showCreateDialog,
  showUpdateDialog,
  deleteAction,
  createUpdateAction
} = await createUserCrud({ tableConfigSavingKey: 'IdentityUserManagement' })
</script>
<style lang="scss"></style>
