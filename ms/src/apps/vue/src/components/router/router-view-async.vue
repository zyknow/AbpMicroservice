<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <!-- <KeepAlive> -->
      <!--  -->
      <!-- setup async need Suspense  -->
      <Suspense>
        <component :is="Component" />

        <!-- loading template -->
        <template #fallback>
          <RouterViewAsyncLoading />
        </template>
      </Suspense>
      <!-- </KeepAlive> -->
    </template>
  </router-view>
</template>
<script lang="ts" setup>
import RouterViewAsyncLoading from './router-view-async-loading.vue'
</script>
<style lang="sass" scoped></style>
