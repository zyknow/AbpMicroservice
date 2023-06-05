import { roleApi } from '@/api/abp-system/role'
import { CreateRoleInput, Role, UpdateRoleInput } from '@/api/abp-system/role/typing'
import { CrudOptions } from '@/components/crud-table/types/base'
import { useLocalization } from '@/hooks/abp/useLocalization'
import { useCrud } from '@/hooks/web/useCrud'
import { QChip, QInput } from 'quasar'

type Key = string
type Dto = Role
type CreateInput = CreateRoleInput
type UpdateInput = UpdateRoleInput
type PageRequest = FilterPageRequest

export const createRoleCrud = async ({
  tableConfigSavingKey
}: {
  tableConfigSavingKey?: string
}) => {
  const api = roleApi
  const localizationModuleName = 'AbpIdentity'
  const { L, DL } = useLocalization(localizationModuleName)
  const { CUAction, UpdateAction, CreateAction, PageAction, DeleteAction } = useCrud<
    Key,
    Dto,
    PageRequest,
    CreateInput,
    UpdateInput
  >({
    getByIdApi: api.getById,
    pageApi: api.getPage,
    deleteApi: api.delete,
    createApi: api.create,
    updateApi: api.update
  })

  const createUpdateCommonOptions: CrudOptions<CreateInput | UpdateInput> = {
    name: {
      type: 'text',
      rules: (r) => r.required()
    },
    isDefault: {
      type: 'checkBox',
      value: false
    },
    isPublic: {
      type: 'checkBox',
      value: false
    }
  }

  const updateAction = UpdateAction(createUpdateCommonOptions)

  const createAction = CreateAction(createUpdateCommonOptions)

  const createUpdateAction = CUAction(updateAction, createAction)

  const pageAction = PageAction({
    columns: [
      {
        field: 'name',
        component: ({ row }) => (
          <div>
            {row.name}
            {row.isPublic && (
              <QChip color="primary" dense outline>
                {DL('isPublic')}
              </QChip>
            )}
          </div>
        )
      },
      '__actions'
    ],
    request: {
      filter: {
        type: 'text',
        component: ({ input, getInputElementProps }) => (
          <QInput
            {...getInputElementProps()}
            modelValue={input.filter}
            onUpdate:modelValue={(v: string) => (input.filter = v)}
          ></QInput>
        )
      }
    }
  })
  pageAction.loadTableConfigSaving(tableConfigSavingKey)

  const deleteAction = DeleteAction()

  deleteAction.postInvokes.push(async (context) => {
    await pageAction.invoke()
    context.result?.notifyOnErr()
  })

  const showCreateDialog = async () => {
    createUpdateAction.showCreate()
  }

  const showUpdateDialog = async (id: Key) => {
    await createUpdateAction.showUpdate(id, api.getById)
  }

  return {
    L,
    showCreateDialog,
    showUpdateDialog,
    localizationModuleName,
    createUpdateAction,
    createAction,
    updateAction,
    pageAction,
    deleteAction
  }
}
