<template>
  <div class="space-x-1">
    <q-btn dense color="primary" icon="edit" @click="$emit('onUpdateClick')" />
    <q-btn dense color="red" icon="delete" @click="$emit('onDeleteClick')" />
  </div>
</template>
<script lang="ts" setup>
defineEmits(['onUpdateClick', 'onDeleteClick'])
</script>
<style lang="sass" scoped></style>
