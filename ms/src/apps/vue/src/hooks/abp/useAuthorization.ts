import authKeys from '@/definitions/auth-keys'
import { useAbpStore } from '@/stores/modules/abp'

interface PermissionChecker {
  isGranted(getKey: (key: typeof authKeys) => string | string): boolean
  isGranteds(name: string | string[]): boolean
  authorize(name: string | string[]): void
}
export function useAuthorization(): PermissionChecker {
  const getGrantedPolicies = computed(() => {
    const abpStore = useAbpStore()
    return abpStore.application.auth.grantedPolicies ?? {}
  })

  function isGranteds(name: string | string[]): boolean {
    const grantedPolicies = getGrantedPolicies.value
    if (Array.isArray(name)) {
      return name.every((name) => grantedPolicies[name])
    }
    return grantedPolicies[name]
  }

  function isGranted(getKey: (key: typeof authKeys) => string | string): boolean {
    const name = getKey(authKeys)
    const grantedPolicies = getGrantedPolicies.value
    if (Array.isArray(name)) {
      return name.every((name) => grantedPolicies[name])
    }
    return grantedPolicies[name]
  }

  function authorize(name: string | string[]): void {
    if (!isGranteds(name)) {
      throw Error(`Authorization failed! Given policy has not granted: ${name}`)
    }
  }

  return {
    isGranteds,
    isGranted,
    authorize
  }
}
