<template>
  <q-btn icon="r_translate" :label="title">
    <q-menu>
      <q-item
        v-for="(langTitle, lang, i) in supportLangs"
        :key="i"
        v-close-popup
        clickable
        :active="$appStore.lang == lang"
        @click="$appStore.setLanguage(lang)"
      >
        <q-item-section>{{ langTitle }}</q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>
<script lang="ts" setup>
import { supportLangs } from '@/locales'
import { QBtn } from 'quasar'

defineProps<{
  title?: string
}>()
</script>
