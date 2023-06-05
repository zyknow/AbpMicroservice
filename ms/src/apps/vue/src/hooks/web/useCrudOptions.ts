import { FieldFilterOption } from '@/components/crud-table/base/typing'
import { useLocalization } from '../abp/useLocalization'
export const useCrudOptions = () => {
  const { L } = useLocalization('AbpUi')

  const yesOrNoSelect = () => {
    const option: FieldFilterOption = {
      type: 'select',
      options: [
        { value: true, label: L('Yes') },
        { value: false, label: L('No') }
      ],
      emitValue: true,
      class: 'w-36'
    }
    return option
  }

  return {
    yesOrNoSelect
  }
}
