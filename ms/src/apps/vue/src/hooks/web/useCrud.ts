import { create_PageAction } from '@/components/crud-table/types/page-action'

import {
  create_CreateAction,
  create_CreateUpdateAction,
  create_UpdateAction
} from '@/components/crud-table/types/create-update-action'
import { create_DeleteAction } from '@/components/crud-table/types/delete-action'
import { create_InformationAction } from '@/components/crud-table/types/information-action'
// 工具类型，用于从函数类型中移除第一个参数
type ExceptFirstArg<F> = F extends (arg1: any, ...args: infer A) => any ? A : never

export const useCrud = <TKey, TDto, TPageRequest, TCreateInput = any, TUpdateInput = any>({
  pageApi,
  getByIdApi,
  createApi,
  updateApi,
  deleteApi
}: {
  pageApi?: any
  getByIdApi?: any
  createApi?: any
  updateApi?: any
  deleteApi?: any
}) => {
  const PageAction = (...args: ExceptFirstArg<typeof create_PageAction<TPageRequest, TDto>>) =>
    create_PageAction<TPageRequest, TDto>(pageApi, ...([...args] as [any]))

  const UpdateAction = (...args: ExceptFirstArg<typeof create_UpdateAction<TUpdateInput, TDto>>) =>
    create_UpdateAction<TUpdateInput, TDto>(updateApi, ...([...args] as [any]))
  const CreateAction = (...args: ExceptFirstArg<typeof create_CreateAction<TCreateInput, TDto>>) =>
    create_CreateAction<TCreateInput, TDto>(createApi, ...([...args] as [any]))

  const InfoAction = (...args: ExceptFirstArg<typeof create_InformationAction<TDto>>) =>
    create_InformationAction<TDto>(getByIdApi, ...([...args] as [any]))

  const DeleteAction = () => create_DeleteAction<TKey>(deleteApi)
  const CUAction = create_CreateUpdateAction<TCreateInput, TUpdateInput, TDto>

  return {
    PageAction,
    UpdateAction,
    CreateAction,
    CUAction,
    DeleteAction,
    InfoAction
  }
}
