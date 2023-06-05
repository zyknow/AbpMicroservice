import { LocalStorage, SessionStorage } from 'quasar'

enum lsKeys {
  'app_settings',
  'table_options',
  'lang'
}

enum ssKeys {
  'signin_succeeded_to_path'
}

function generator<T extends LocalStorage | SessionStorage, keyType extends { [key: string]: any }>(
  storage: T,
  keys: keyType
): {
  [key in keyof typeof keys]: {
    get: <GET = any>() => GET
    set: (value: any) => void
    remove: () => void
  }
} & { actions: T } {
  const data = { actions: storage }

  Object.keys(keys).forEach((key) => {
    data[key] = {
      get: () => storage.getItem(key),
      set: (value: any) => storage.set(key, value),
      remove: () => storage.remove(key)
    }
  })
  return data as any
}

export const ls = generator(LocalStorage, lsKeys)
export const ss = generator(SessionStorage, ssKeys)
