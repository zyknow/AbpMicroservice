import { merge } from 'lodash-es'
import { useAbpStore } from '@/stores/modules/abp'
const displayNamePrefix = 'DisplayName:'
interface IStringLocalizer {
  L(key: string, args?: Recordable | any[] | undefined): string
}
export function useLocalization(resourceNames?: string | string[]) {
  const getResource = computed(() => {
    const abpStore = useAbpStore()
    const { values } = abpStore.application.localization

    let resource: { [key: string]: string } = {}
    if (resourceNames) {
      if (Array.isArray(resourceNames)) {
        resourceNames.forEach((name) => {
          resource = merge(resource, values[name])
        })
      } else {
        resource = merge(resource, values[resourceNames])
      }
    } else {
      Object.keys(values).forEach((rs) => {
        resource = merge(resource, values[rs])
      })
    }

    return resource
  })

  function L(key?: string, args?: Recordable | any[] | undefined) {
    if (!key) return ''
    if (!getResource.value) return key
    if (!Reflect.has(getResource.value, key)) return key
    return getResource.value[key].format(args ?? [])
  }

  function DL(key?: string) {
    if (!key) return ''

    const field = key.toUpperFirst()

    let value = L(`${displayNamePrefix}${field}`)

    if (value.includes(displayNamePrefix)) {
      value = L(field)
    }

    return value
  }

  const localizer: IStringLocalizer = {
    L: L
  }

  return { L, localizer, DL }
}
