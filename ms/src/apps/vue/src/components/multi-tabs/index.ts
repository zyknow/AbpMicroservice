import { cloneDeep, last, take, takeRight, remove } from 'lodash-es'
import { notify } from '@/utils/notify'
import { creatorRouter } from '@/router'

export type CacheKey = string
export interface CacheItem {
  name: string
  title?: string
  icon?: string
  path: string
}

const privateActions = {
  async removeItemsAsync(tabNames: string[]) {
    if (multiTabState.tagCaches.length <= 1) {
      notify.warn('最后一个标签无法被关闭！')
      return
    }
    multiTabState.exclude = multiTabState.tagCaches
      .filter((c) => tabNames.includes(c.name))
      .map((p) => p.name)
    remove(multiTabState.tagCaches, (list) => tabNames.includes(list.name))
    new Promise<void>((resolve) => {
      setTimeout(() => {
        multiTabState.exclude = []
        resolve()
      })
    })
  },

  addItem(item: CacheItem) {
    if (multiTabState.tagCaches.findIndex((t) => t.name == item.name) >= 0) {
      // 已存在相同标签
      return
    }
    multiTabState.tagCaches.push(cloneDeep(item))
    creatorRouter?.push({ name: item.name })
  },
  /**
   * 添加缓存
   */
  add(item: CacheItem) {
    privateActions.addItem(item)
  }
}

const actions = {
  /**
   * 关闭指定路径标签
   */
  close(name: CacheKey) {
    privateActions.removeItemsAsync([name]).then(() => {
      // 移除当前tab则往后选中，否则往前选中
      if (name == multiTabState.current?.name) {
        creatorRouter?.push({ name: last(multiTabState.tagCaches)!.name })
      }
    })
  },
  /**
   * 关闭指定路径左侧标签
   */
  closeLeft(name: CacheKey) {
    const removeCount = multiTabState.tagCaches.findIndex((t) => t.name == name)
    if (removeCount > 0) {
      privateActions.removeItemsAsync(take(multiTabState.tagCaches, removeCount).map((t) => t.name))
    }
  },
  /**
   * 关闭指定路径右侧标签
   */
  closeRight(name: CacheKey) {
    const removeIndex = multiTabState.tagCaches.findIndex((t) => t.name == name)
    const removeCount = multiTabState.tagCaches.length - removeIndex - 1
    if (removeCount > 0) {
      privateActions.removeItemsAsync(
        takeRight(multiTabState.tagCaches, removeCount).map((t) => t.name)
      )
    }
  },
  /**
   * 关闭除指定路径之外的标签
   */
  closeOther(name: CacheKey) {
    privateActions.removeItemsAsync(
      multiTabState.tagCaches.filter((t) => t.name != name).map((t) => t.name)
    )
  },
  /**
   * 刷新指定路径
   */
  async refreshAsync(name: CacheKey) {
    multiTabState.exclude = [multiTabState.tagCaches.find((c) => c.name == name)!.name!]
    // 刷新延时，可去除
    // await sleepAsync(500)

    // 下次页面更新时再刷新 exclude
    nextTick(() => (multiTabState.exclude = []))
  },
  /**
   * 添加
   * @param to
   */
  addByRouter(to: AppCustomRouteRecordRaw) {
    if (to.meta)
      privateActions.add({
        name: to.name?.toString() || '',
        title: to.meta!.title,
        icon: to.meta.icon,
        path: to.path
      })
  },
  /**
   * 清空所有缓存
   */
  clear() {
    multiTabState.loading = true
    multiTabState.exclude = cloneDeep(multiTabState.tagCaches.map((t) => t.name))
    multiTabState.tagCaches = []
    // 下次页面更新时再刷新 exclude
    nextTick(() => (multiTabState.exclude = []))
    multiTabState.loading = false
  }
}
export const multiTabState = reactive({
  ...actions,
  tagCaches: [] as CacheItem[],
  current: computed(() => creatorRouter?.currentRoute.value),
  exclude: [] as string[],
  loading: false
})
