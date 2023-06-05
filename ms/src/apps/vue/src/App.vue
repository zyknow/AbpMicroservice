<template>
  <router-view />
</template>

<script setup lang="ts">
import { Quasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { quasarLocalization } from './locales'
import { useAppStore } from './stores/modules/app'
import { ls } from './providers/storage-provider'

const appStore = useAppStore()
const i18n = useI18n()

watch(
  () => appStore.lang,
  async (lang) => {
    i18n.locale.value = lang
    ls.lang.set(lang)
    Quasar.lang.set(await quasarLocalization[lang]())
  }
)
</script>
