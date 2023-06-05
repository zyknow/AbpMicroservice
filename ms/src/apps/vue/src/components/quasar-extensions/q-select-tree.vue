<template>
  <q-select
    use-chips
    :model-value="modelValue"
    :options="[]"
    :multiple="multiple"
    @update:model-value="(v) => $emit('update:modelValue', v)"
  >
    <q-menu fit auto-close>
      <q-tree
        :selected="!multiple ? modelValue : null"
        :ticked="multiple ? (modelValue as any) : null"
        selected-color="primary"
        :nodes="nodes!"
        :default-expand-all="defaultExpandAll"
        :node-key="nodeKey!"
        :tick-strategy="tickStrategyComputed"
        @update:selected="(v) => (!multiple ? $emit('update:modelValue', v) : '')"
        @update:ticked="(v) => (multiple ? $emit('update:modelValue', v) : '')"
      />
    </q-menu>
  </q-select>
</template>
<script lang="ts">
export default {
  name: ''
}
</script>
<script lang="ts" setup>
import { QTreeNode } from 'quasar'

defineEmits(['update:modelValue', 'update:ticked', 'update:selected'])

type TickStrategyType = 'none' | 'strict' | 'leaf' | 'leaf-filtered' | undefined

const props = defineProps({
  /**
   * v-model
   */
  modelValue: Object as PropType<[] | unknown>,
  /**
   * 是否多选
   */
  multiple: Boolean,
  /**
   *  nodes (参考quasar tree 组件)
   */
  nodes: Array as PropType<QTreeNode<unknown>[]>,
  /**
   * nodeKey (参考quasar tree 组件)
   */
  nodeKey: String,
  /**
   * tickStrategy (参考quasar tree 组件)
   */
  tickStrategy: {
    type: Object as PropType<TickStrategyType>
  },
  /**
   * 默认展开所有节点 (参考quasar tree 组件)
   */
  defaultExpandAll: Boolean
})

const tickStrategyComputed = computed(() =>
  props.tickStrategy || props.multiple ? 'leaf-filtered' : 'none'
)
</script>
<style lang="sass" scoped></style>
