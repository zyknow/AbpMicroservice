<template>
  <q-header :reveal="appStore.config.header.reveal" class="main-layout">
    <HeaderToolbar />
    <q-separator v-if="appStore.isMobileWidth" />
  </q-header>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/modules/app'
import HeaderToolbar from './header-toolbar.vue'
const appStore = useAppStore()
</script>
<style lang="scss" scoped></style>
