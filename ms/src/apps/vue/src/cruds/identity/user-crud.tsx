import { roleApi } from '@/api/abp-system/role'
import { userApi } from '@/api/abp-system/user'
import { CreateUserInput, UpdateUserInput, User } from '@/api/abp-system/user/typing'
import { CrudOptions } from '@/components/crud-table/types/base'
import { useLocalization } from '@/hooks/abp/useLocalization'
import { useCrud } from '@/hooks/web/useCrud'

type Key = string
type Dto = User
type CreateInput = CreateUserInput
type UpdateInput = UpdateUserInput
type PageRequest = FilterPageRequest

export const createUserCrud = async ({
  tableConfigSavingKey
}: {
  tableConfigSavingKey?: string
}) => {
  const api = userApi
  const localizationModuleName = 'AbpIdentity'
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
    userName: {
      type: 'text',
      rules: (r) => r.required()
    },
    name: {
      type: 'text',
      rules: (r) => r.required()
    },
    surname: {
      type: 'text'
    },
    roleNames: {
      type: 'select'
    },
    password: {
      type: 'password'
    },
    email: {
      type: 'text',
      rules: (r) => r.isEmail()
    },
    phoneNumber: {
      type: 'text'
    },
    isActive: {
      type: 'checkBox',
      value: true
    },
    lockoutEnabled: {
      type: 'checkBox',
      value: true
    }
  }

  const loadRoleNames = async () => {
    const roleRes = await roleApi.getAll()
    const roleNames = roleRes?.data?.items?.map((r) => r.name) || []
    createUpdateCommonOptions.roleNames = {
      type: 'select',
      multiple: true,
      options: roleNames,
      label: L('Roles')
    }
  }

  const updateAction = UpdateAction(createUpdateCommonOptions)

  const createAction = CreateAction(createUpdateCommonOptions)

  const createUpdateAction = CUAction(updateAction, createAction)

  const pageAction = PageAction({
    columns: ['userName', 'email', 'phoneNumber', '__actions'],
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
    await loadRoleNames()
    createUpdateAction.showCreate()
  }

  const showUpdateDialog = async (id: string) => {
    await loadRoleNames()
    await createUpdateAction.showUpdate(id, api.getById)
    createUpdateAction.currentAction.input.roleNames = (
      await userApi.getUserRoles(createUpdateAction.updateAction.updateId?.toString())
    ).data.items.map((r) => r.name)
  }

  return reactive({
    L,
    showCreateDialog,
    showUpdateDialog,
    localizationModuleName,
    createUpdateAction,
    pageAction,
    deleteAction
  })
}
