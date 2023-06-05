<template>
  <q-input :model-value="modelValue" @update:model-value="(v) => $emit('update:modelValue', v)">
    <template #prepend>
      <q-icon v-if="!hiddenDateBtn" name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            :model-value="modelValue"
            mask="YYYY-MM-DD HH:mm:ss"
            @update:model-value="(v) => $emit('update:modelValue', v)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template #append>
      <div class="flex flex-row space-x-2">
        <q-icon v-if="!hiddenTimeBtn" name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time
              :model-value="modelValue"
              mask="YYYY-MM-DD HH:mm:ss"
              format24h
              @update:model-value="(v) => $emit('update:modelValue', v)"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </div>
    </template>
  </q-input>
</template>
<script lang="ts">
import { GlobalComponentConstructor, QInput, QInputProps, QInputSlots } from 'quasar'

const components = defineComponent({
  name: 'QDateTime',
  components: {
    QInput
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    hiddenDateBtn: {
      type: Boolean,
      default: false
    },
    hiddenTimeBtn: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup() {
    return {}
  }
})

export default components as typeof components &
  GlobalComponentConstructor<QInputProps, QInputSlots>
</script>
<style lang="scss" scoped></style>
