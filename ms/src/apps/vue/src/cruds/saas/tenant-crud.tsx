import { tenantApi } from '@/api/abp-system/tenant'
import { CreateTenantInput, Tenant, UpdateTenantInput } from '@/api/abp-system/tenant/typing'
import { CrudOptions } from '@/components/crud-table/types/base'
import { useLocalization } from '@/hooks/abp/useLocalization'
import { useCrud } from '@/hooks/web/useCrud'

type Key = string
type Dto = Tenant
type CreateInput = CreateTenantInput
type UpdateInput = UpdateTenantInput
type PageRequest = FilterPageRequest

export const createTenantCrud = async ({
  tableConfigSavingKey
}: {
  tableConfigSavingKey?: string
}) => {
  const api = tenantApi
  const localizationModuleName = 'AbpTenantManagement'
  const { L } = useLocalization(localizationModuleName)
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
      label: L('TenantName'),
      type: 'text',
      rules: (r) => r.required()
    }
  }

  const createOptions: CrudOptions<CreateInput> = {
    ...createUpdateCommonOptions,
    adminEmailAddress: {
      type: 'text',
      rules: (r) => r.isEmail()
    },
    adminPassword: {
      type: 'password',
      rules: (r) => r.required()
    }
  }

  const updateAction = UpdateAction(createUpdateCommonOptions)

  const createAction = CreateAction(createOptions)

  const createUpdateAction = CUAction(updateAction, createAction)

  const pageAction = PageAction({
    columns: [
      {
        field: 'name',
        label: L('TenantName')
      },
      '__actions'
    ],
    request: {
      filter: {
        type: 'text'
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

  const showUpdateDialog = async (id: string) => {
    await createUpdateAction.showUpdate(id, api.getById)
  }

  return {
    L,
    showCreateDialog,
    showUpdateDialog,
    localizationModuleName,
    createUpdateAction,
    pageAction,
    deleteAction
  }
}
