<template>
  <div class="flex flex-row items-center btns">
    <q-btn icon="task" flat dense />
    <q-btn icon="settings" flat dense />

    <transition>
      <q-btn
        dense
        flat
        class="transition duration-500 ease-in-out"
        :icon="!$appStore.config.theme.dark ? 'dark_mode' : 'light_mode'"
        @click="$appStore.setDark(!$appStore.config.theme.dark)"
      />
    </transition>
    <LanguageSelect dense flat />
    <CurrentUser />
  </div>
</template>
<script lang="ts" setup>
import LanguageSelect from '@/components/locales/language-select.vue'
import CurrentUser from '@/components/current-user/index.vue'
</script>
<style lang="scss" scoped>
.btns {
  @apply space-x-2;
  > * {
    @apply text-sm;
  }
}
</style>
