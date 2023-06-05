<template>
  <q-drawer
    v-if="!appStore.isMobileWidth"
    class="main-layout"
    :mini-to-overlay="sider.miniToOverlay"
    :mini="sider.mini"
    :model-value="sider.collapse"
    :width="sider.width"
    :behavior="appStore.isMobileWidth ? 'mobile' : 'desktop'"
    side="left"
    :breakpoint="sider.breakpoint"
    @update:model-value="onUpdate"
  >
    <q-scroll-area class="fit">
      <MenuItem :routers="userStore.routers!" />
    </q-scroll-area>
  </q-drawer>

  <MenuItem v-else :routers="userStore.routers!" />
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import MenuItem from './menu-item.vue'
const appStore = useAppStore()
const userStore = useUserStore()
const sider = appStore.config.sider

const onUpdate = (v: boolean) => {
  appStore.setSiderDisplay(v)
}
sider.collapse = true
</script>
<style lang="scss" scoped></style>
