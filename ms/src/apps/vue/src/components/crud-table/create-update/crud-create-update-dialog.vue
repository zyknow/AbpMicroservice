<template>
  <q-dialog persistent v-model="action.visible">
    <q-card class="w-full">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t(`global.${createUpdateAction.type}`) }} {{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-form @submit="submit" class="p-2">
        <q-card-section class="">
          <crud-create-update-inputs
            :cu-options="action.currentAction"
            :localization-module-name="localizationModuleName"
          >
            <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
              <slot :name="item" v-bind="data"></slot>
            </template>
          </crud-create-update-inputs>
        </q-card-section>
        <q-card-actions align="right">
          <submit-btn />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { CreateUpdateActionType } from '../types/create-update-action'
import { GlobalComponentConstructor, QDialogProps, QDialogSlots } from 'quasar'

const component = defineComponent({
  props: {
    createUpdateAction: {
      type: Object as PropType<CreateUpdateActionType>,
      required: true
    },
    localizationModuleName: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['onSubmited'],
  setup(props, { emit }) {
    const action = computed(() => {
      return props.createUpdateAction
    })

    const submit = async () => {
      const res = await action.value!.currentAction!.invoke(action.value!.input)
      if (res?.succeeded) {
        action.value.visible = false
      }
      emit('onSubmited', res)
    }

    return {
      submit,
      action
    }
  }
})

export default component as typeof component &
  GlobalComponentConstructor<QDialogProps, QDialogSlots>
</script>
<style lang="sass" scoped></style>
