<template>
  <q-card class="w-full">
    <q-form @submit="onSubmit">
      <q-inner-loading :showing="state.loading" class="z-10 text-green-500" />
      <q-card-section>
        <slot name="title">
          <div class="flex flex-row items-center justify-between">
            <div class="text-h6">{{ L('Permissions') }} - {{ state.entityName }}</div>
            <q-checkbox
              :model-value="isAllPermissionGranted"
              left-label
              :label="L('SelectAllInAllTabs')"
              @update:model-value="onIsAllPermissionGrantedClick"
            />

            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </slot>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="flex flex-row flex-nowrap">
          <q-tabs
            v-model="state.tab"
            vertical
            style="min-width: 200px"
            active-class="bg-primary text-white"
          >
            <div v-for="(item, index) in state.permission?.groups" :key="index">
              <q-tab :label="item.displayName" :name="item.name">
                <q-badge rounded color="green" floating>{{
                  item.permissions.filter((p: any) => p.isGranted == true).length
                }}</q-badge>
              </q-tab>
            </div>
          </q-tabs>
          <q-separator vertical />
          <q-tab-panels
            v-model="state.tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel
              v-for="(item, indexTab) in state.permission?.groups"
              :key="indexTab"
              :name="item.name"
            >
              <div class="flex flex-col">
                <q-checkbox
                  v-for="(permission, indexCheckBox) in item.permissions"
                  :key="indexCheckBox"
                  v-model="permission.isGranted"
                  :class="permission.parentName ? 'ml-6' : ''"
                  :label="permission.displayName"
                />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card-section>
      <q-card-section />

      <q-card-actions align="right">
        <submit-btn />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script lang="ts" setup>
import { uniq } from 'lodash'
import { useQuasar } from 'quasar'
import { permissionsApi } from '@/api/abp-system/permissions'
import { PermissionGroup, UpdatePermissionInput } from '@/api/abp-system/permissions/typing'
import { useLocalization } from '@/hooks/abp/useLocalization'
import { openiddictApplicationApi } from '@/api/abp-system/applications'
import { userApi } from '@/api/abp-system/user'
import SubmitBtn from '../form/btns/submit-btn.vue'

const $q = useQuasar()

const { L } = useLocalization('AbpPermissionManagement')

const emits = defineEmits(['onSubmitSucceeded'])
const props = defineProps<{ providerName: 'U' | 'R' | 'C'; providerKey: string }>()

const state = reactive({
  permission: undefined as PermissionGroup | undefined,
  tab: '',
  entityName: '',
  loading: false
})

const getCurrentProviderPermission = async () => {
  state.loading = true
  const res = await permissionsApi.get(props.providerName, props.providerKey)
  if (res.succeeded) {
    state.permission = res.data
    state.tab = res.data.groups[0].name

    state.entityName = await getProviderKey()
  }
  state.loading = false
}

const getProviderKey = async () => {
  const handler = {
    U: async () => {
      const res = await userApi.getById(props.providerKey)
      res.notifyOnErr()
      return res.data.userName
    },
    R: async () => {
      return props.providerKey
      // const res = await roleApi.getById(props.providerKey)
      // res.notifyOnErr()
      // return res.data.name
    },
    C: async () => {
      const res = await openiddictApplicationApi.getById(props.providerKey)
      res.notifyOnErr()
      return res.data.clientId
    }
  }
  return (await handler[props.providerName]()) || ''
}

const isAllPermissionGranted = computed(() => {
  let temp = [] as boolean[]
  if (!state.permission?.groups) return false
  for (const group of state.permission?.groups) {
    for (const permission of group?.permissions) {
      temp.push(permission.isGranted)
      if (temp.includes(true) && temp.includes(false)) return undefined
    }
  }

  temp = uniq(temp)

  return temp[0]
})

const onIsAllPermissionGrantedClick = () => {
  const isAllPermissionGrantedValue = isAllPermissionGranted.value
  if (!state.permission?.groups) return false
  for (const group of state.permission?.groups) {
    for (const permission of group?.permissions) {
      permission.isGranted = !isAllPermissionGrantedValue
    }
  }
}

const onSubmit = async () => {
  state.loading = true
  const permissions = [] as any[]
  for (const group of state.permission!.groups) {
    permissions.push(...group.permissions)
  }

  const showDialog = () => {
    return new Promise((resolve) => {
      $q.dialog({
        title: L('SaveWithoutAnyPermissionsWarningMessage'),
        ok: true,
        cancel: true
      })
        .onOk(() => {
          resolve(true)
        })
        .onCancel(() => {
          resolve(false)
        })
        .onDismiss(() => {
          resolve(false)
        })
    })
  }
  if (!permissions.filter((p) => p.isGranted).length && !(await showDialog())) {
    state.loading = false
    return
  }

  const res = await permissionsApi.update(props.providerName, props.providerKey, {
    permissions
  } as UpdatePermissionInput)
  state.loading = false
  if (res.succeeded) {
    emits('onSubmitSucceeded')
  }
}

getCurrentProviderPermission()
</script>
<style lang="sass" scoped></style>
