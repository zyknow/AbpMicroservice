import { auditLogApi } from '@/api/abp-system/audit-logs'
import { AuditEntityChange, AuditEntityChangePageRequest } from '@/api/abp-system/audit-logs/typing'
import { useLocalization } from '@/hooks/abp/useLocalization'
import { useCrud } from '@/hooks/web/useCrud'

type Key = string
type Dto = AuditEntityChange
type PageRequest = AuditEntityChangePageRequest
// TODO: need data to test
export const createRoleCrud = async ({
  tableConfigSavingKey
}: {
  tableConfigSavingKey?: string
}) => {
  const api = auditLogApi
  const localizationModuleName = 'AbpIdentity'
  const { L, DL } = useLocalization(localizationModuleName)
  const { PageAction, InfoAction } = useCrud<Key, Dto, PageRequest>({
    pageApi: api.getEntityChangePage,
    getByIdApi: api.getEntityChangeById
  })

  const pageAction = PageAction({
    columns: ['__actions'],
    request: {}
  })
  pageAction.loadTableConfigSaving(tableConfigSavingKey)

  const infoAction = InfoAction()

  return {
    L,
    localizationModuleName,
    infoAction,
    pageAction
  }
}
