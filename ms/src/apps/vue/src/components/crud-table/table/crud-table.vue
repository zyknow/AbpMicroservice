<template>
  <q-table
    v-model:selected.sync="pageAction!.selected"
    v-model:pagination="pageAction!.pagination"
    :rows="pageAction.items"
    selection="multiple"
    :columns="(getColumns as any)"
    :loading="pageAction.loading"
    :row-key="(v) => v.id"
    flat
    square
    :visible-columns="[...pageAction.visibleColumns, '__actions']"
    :rows-per-page-options="[5, 10, 15, 50, 500, 1000]"
    table-header-class="bg-gray-100 dark:bg-gray-900"
    class="h-full w-full fixed-qtable-header overflow-hidden"
    :virtual-scroll="pageAction.items.length >= 100"
    @request="onTablePaginationChange"
  >
    <template #top>
      <slot name="toolbar" :page-options="pageAction">
        <div class="flex flex-row gap-2 w-full">
          <crud-page-request-inputs
            :page-action="pageAction"
            @on-search="pageAction.invoke()"
            :localizationModuleName="localizationModuleName"
          >
            <template
              v-for="item in Object.keys(pageAction.input)"
              #[`input-${item}`]="data"
              :key="item"
            >
              <slot :name="`input-${item}`" v-bind="data"></slot>
            </template>
          </crud-page-request-inputs>
          <crud-toolbar-btns
            :hiddenDefaultBtns="hiddenDefaultBtns"
            :page-action="pageAction"
            @on-search="pageAction.invoke()"
            @on-delete-click="$emit('onDeleteSelectedClick', pageAction.selected)"
            @on-create-click="
              () => {
                $emit('onCreateClick')
              }
            "
          />
        </div>
      </slot>
    </template>

    <template #loading>
      <q-inner-loading showing color="primary" />
    </template>

    <template #pagination>
      <div class="flex flex-row space-x-8">
        <q-pagination
          v-model="pageAction!.pagination.page"
          color="primary"
          :max-pages="9"
          :max="pageAction.pagination.totalPages"
          boundary-numbers
          @click="onTablePaginationChange"
        />
        <q-select
          v-if="columns && !$appStore.isMobileWidth"
          v-model="pageAction!.visibleColumns"
          multiple
          standout="text-white bg-primary"
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="selectVisibleColumnOption"
          option-value="field"
          options-cover
        />
      </div>
    </template>

    <template #body-cell-__actions="props">
      <q-td :props="props">
        <div class="space-x-1 flex flex-row items-center justify-center">
          <slot name="pre-actions" v-bind="{ ...props }"></slot>
          <slot name="default-actions" v-bind="{ ...props }">
            <crud-table-action_cells
              @on-delete-click="$emit('onDeleteClick', props.row)"
              @on-update-click="$emit('onUpdateClick', props.row)"
            />
          </slot>
          <slot name="post-actions" v-bind="{ ...props }"></slot>
        </div>
      </q-td>
    </template>

    <template
      v-for="(column, key) in getComponentColumns"
      #[`body-cell-${column.field.toString()}`]="props"
      :key="key"
    >
      <q-td :props="props">
        <component :is="column.component!({row: props.row})" />
      </q-td>
    </template>

    <template v-for="item in Object.keys($slots)" #[item]="props" :key="item">
      <q-td :props="props">
        <slot :name="item" v-bind="props"></slot>
      </q-td>
    </template>
  </q-table>
</template>
<script lang="ts">
import { useLocalization } from '@/hooks/abp/useLocalization'
import { ColumnType } from '../base/typing'
import { PageActionType } from '../types/page-action'
import { GlobalComponentConstructor, QTableProps, QTableSlots } from 'quasar'
import { HiddenDefaultBtnType } from '../toolbar/typing'
import { Slot } from 'vue'

interface Slots {
  'pre-actions'?: Slot
  'default-actions'?: Slot
  'post-actions'?: Slot
}

const component = defineComponent({
  props: {
    pageAction: {
      type: Object as PropType<PageActionType>,
      required: true
    },
    columns: {
      type: Array as PropType<(ColumnType | string)[]>,
      default: () => []
    },
    localizationModuleName: {
      type: [String, Array] as PropType<string>,
      default: 'AbpUi'
    },
    hiddenDefaultBtns: {
      type: Array as PropType<HiddenDefaultBtnType[]>,
      default: () => []
    },
    slots: Object as () => Slots
  },
  emits: [
    'onTablePaginationChange',
    'onSearch',
    'onDeleteClick',
    'onUpdateClick',
    'onCreateClick',
    'onDeleteSelectedClick'
  ],
  setup(props, { emit }) {
    const selectVisibleColumnOption = computed(() => {
      if (!getColumns.value) return
      return getColumns.value.filter((p) => p?.field !== '__actions')
    })

    const { DL } = useLocalization(props.localizationModuleName)

    const getComponentColumns = computed(
      () =>
        props.pageAction.columnDefines.filter(
          (p) => typeof p === 'object' && p.component
        ) as ColumnType<any>[]
    )

    const getDefaultColumnDefine = (field?: string) => {
      if (!field) {
        return undefined
      }

      if (field === '__actions') {
        const abpuiL = useLocalization().L

        const label = abpuiL('Actions')

        return {
          name: field,
          label: label,
          field: field,
          align: 'center'
        }
      }

      return {
        name: field,
        label: DL(field),
        field: field,
        align: 'center',
        sortable: true
      }
    }

    const getColumns = computed(() => {
      if (!props.pageAction.items.length) return undefined

      if (props.columns) {
        return props.columns?.map((column) => {
          if (typeof column === 'string') {
            return getDefaultColumnDefine(column)
          } else {
            return {
              ...getDefaultColumnDefine(column.field?.toString()),
              ...column
            }
          }
        })
      } else {
        // 未定义columns
        const ignoreFields = ['extraProperties', 'concurrencyStamp', 'id']
        const items = props.pageAction.items as any[]
        const columns = Object.keys(items[0]).filter((field) => !ignoreFields.includes(field))
        return columns.map((column) => getDefaultColumnDefine(column))
      }
    })

    const onTablePaginationChange = ({
      pagination
    }: {
      pagination: {
        sortBy: string
        descending: boolean
        page: number
        rowsPerPage: number
      }
    }) => {
      props.pageAction!.pagination = { ...props.pageAction.pagination, ...pagination }
      emit('onTablePaginationChange', pagination)
      emit('onSearch')
      props.pageAction.invoke()
    }
    props.pageAction.invoke()

    return {
      getColumns,
      selectVisibleColumnOption,
      onTablePaginationChange,
      getComponentColumns
    }
  }
})

export default component as typeof component &
  GlobalComponentConstructor<Omit<QTableProps, 'columns'>, QTableSlots>
</script>
<style lang="sass" scoped></style>
