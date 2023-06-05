import { ls } from '@/providers/storage-provider'

type TableOptionType = {
  [key: string]: {
    rowsPerPage: number
    visibleColumns?: string[]
  }
}

const tableOptions = (ls.table_options.get() || {}) as TableOptionType

export class BaseCrudTableConfigSaving {
  tableOptionSaveKey: string

  constructor(tableKey: string) {
    this.tableOptionSaveKey = tableKey
  }

  saveTableOption(rowsPerPage: number, visibleColumns: string[]) {
    if (!this.tableOptionSaveKey || !rowsPerPage || !visibleColumns) return
    tableOptions[this.tableOptionSaveKey] = {
      rowsPerPage: rowsPerPage,
      visibleColumns: visibleColumns
    }
    ls.table_options.set(tableOptions)
  }

  getTableOption() {
    if (!this.tableOptionSaveKey) return null
    return tableOptions[this.tableOptionSaveKey]
  }
}
