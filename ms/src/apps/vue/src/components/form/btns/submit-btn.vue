<template>
  <q-btn
    :label="$t('global.submit')"
    icon="check"
    color="primary"
    type="submit"
    class="w-24 h-10"
  />
  <slot name="post"></slot>
</template>
<script lang="ts">
import { GlobalComponentConstructor, QBtnProps, QBtnSlots } from 'quasar'

const component = defineComponent({
  setup() {
    return {}
  }
})

export default component as typeof component & GlobalComponentConstructor<QBtnProps, QBtnSlots>
</script>
<style lang="sass" scoped></style>
