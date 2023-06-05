<template>
  <q-btn flat dense no-caps>
    <div class="flex flex-row flex-nowrap items-center justify-center select-none space-x-2">
      <span class="text-xl"> {{ $userStore.getCurrentUserDisplayName }}</span>
      <q-avatar square class="rounded-xl" v-if="$userStore.avatar">
        <img :src="$userStore.avatar" />
      </q-avatar>

      <q-menu>
        <q-item v-close-popup clickable>
          <q-item-section>{{ '个人设置' }}</q-item-section>
        </q-item>

        <q-separator />
        <q-item v-close-popup clickable @click="$userStore.logoutRedirect()">
          <q-item-section>{{ '退出登录' }}</q-item-section>
        </q-item>
      </q-menu>
    </div>
  </q-btn>
</template>
<script lang="ts" setup></script>
<style lang="sass" scoped></style>
