<template>
  <q-layout view="hHh LpR fFf" class="main-layout">
    <Header v-if="!$appStore.isMobileWidth" />
    <SideMenu v-if="!$appStore.isMobileWidth" />

    <q-page-container class="h-screen">
      <div class="h-full p-0.5 flex flex-col" :class="!$appStore.isMobileWidth ? 'pb-2 pr-2' : ''">
        <multi-tab v-if="$appStore.config.multiTab.enabled && !$appStore.isMobileWidth" />
        <q-card class="flex-1 rounded-xl overflow-hidden" v-if="!$appStore.isMobileWidth">
          <!-- <q-scroll-area class="h-full" :visible="true"> -->

          <RouterViewAsync class="rounded-xl h-full" />
          <!-- </q-scroll-area> -->
        </q-card>
        <!-- <q-scroll-area v-else class="h-full" :visible="true"> -->
        <RouterViewAsync v-else class="h-full" />
        <!-- </q-scroll-area> -->
      </div>
    </q-page-container>

    <q-footer class="h-70px bg-transparent" v-if="$appStore.isMobileWidth">
      <div
        class="bottom-0 flex flex-row flex-nowrap justify-around items-center h-70px rounded-t-xl text-gray-500 w-full bg-gray-300"
      >
        <div class="flex flex-col justify-center items-center">
          <q-icon flat size="2rem" name="home" />
          <span>Home</span>
        </div>
        <div
          class="bg-pink-400 rounded-10xl w-80px h-80px flex justify-center items-center mb-2 border border-10 border-gray-300 z-10"
        >
          <q-icon
            class="text-white"
            flat
            size="2rem"
            :class="state.mobileNavDialogVisible ? 'animate-ping' : ''"
            :name="!state.mobileNavDialogVisible ? 'menu' : 'close'"
            @click="state.mobileNavDialogVisible = !state.mobileNavDialogVisible"
          />
        </div>
        <div class="flex flex-col justify-center items-center">
          <q-icon flat size="2rem" name="settings" />
          <span>Settings</span>
        </div>

        <div class="flex flex-col justify-center items-center">
          <q-icon flat size="2rem" name="account_circle" />
          <span>Account</span>
        </div>
      </div>
    </q-footer>
  </q-layout>

  <q-dialog
    v-if="$appStore.isMobileWidth"
    class="z-10"
    v-model="state.mobileNavDialogVisible"
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <mobile-menu />
  </q-dialog>
</template>

<script lang="ts" setup>
import { QLayout } from 'quasar'
import MultiTab from '@/components/multi-tabs/index.vue'
import MobileMenu from './mobile-menu/index.vue'
import Header from './header/index.vue'
import SideMenu from './side-menu/index.vue'
import RouterViewAsync from '@/components/router/router-view-async.vue'
const state = reactive({
  mobileNavDialogVisible: false
})
</script>

<style lang="scss" scoped></style>
