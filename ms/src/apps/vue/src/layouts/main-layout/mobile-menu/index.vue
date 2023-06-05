<template>
  <q-card>
    <q-card-section class="flex flex-col space-y-2">
      <div class="flex flex-row justify-between">
        <HeaderBranding />
        <HeaderToolbarItems />
      </div>
      <q-separator />
      <SideMenu :routers="$userStore.routers!" />
    </q-card-section>
    <q-card-section />
  </q-card>
</template>
<script lang="ts" setup>
import HeaderBranding from '../header/header-branding.vue'
import HeaderToolbarItems from '../header/header-toolbar-items.vue'
import SideMenu from '../side-menu/index.vue'
</script>
<style lang="scss" scoped></style>
