<template>
  <q-toolbar>
    <q-icon size="25px" name="menu" @click="onToolbarClick" />
    <HeaderBranding />
    <HeaderToolbarItems />
  </q-toolbar>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/modules/app'
import HeaderBranding from './header-branding.vue'
import HeaderToolbarItems from './header-toolbar-items.vue'

const appStore = useAppStore()

const onToolbarClick = () => {
  appStore.setSiderDisplay(appStore.getSideDisplay)
}
</script>
<style lang="sass" scoped></style>
