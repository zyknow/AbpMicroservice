<template>
  <q-tabs align="left" dense inline-label outside-arrows class="w-full">
    <q-route-tab
      :ripple="false"
      v-for="(tab, index) in multiTabState.tagCaches"
      :key="index"
      :to="tab.path"
      :icon="tab.icon"
      :label="tab.title"
    >
      <q-btn
        icon="close"
        dense
        flat
        :ripple="false"
        @click.prevent="multiTabState.close(tab.name)"
      />
    </q-route-tab>
  </q-tabs>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { multiTabState } from '.'
import { eventBus } from '@/providers/evnet-bus-provider'
const router = useRouter()

const { onCurrentRouterChange } = eventBus

multiTabState.addByRouter(router.currentRoute.value as unknown as AppCustomRouteRecordRaw)

onCurrentRouterChange.on((to) => {
  multiTabState.addByRouter(to as unknown as AppCustomRouteRecordRaw)
})
</script>
<style lang="scss" scoped></style>
