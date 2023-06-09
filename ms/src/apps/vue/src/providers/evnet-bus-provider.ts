import { RouteLocationNormalized } from 'vue-router'
import { EventBus } from 'quasar'

const instance = new EventBus()
const createEventBus = <CallBackType>(key: string) => {
  return {
    on(callback: (data: CallBackType) => any) {
      return instance.on(key, callback)
    },
    once(callback: (data: CallBackType) => any) {
      return instance.once(key, callback)
    },
    emit(args: CallBackType) {
      return instance.emit(key, args)
    },
    off(callback?: (data: CallBackType) => any) {
      return instance.off(key, callback)
    }
  }
}

export const eventBus = {
  instance,
  // eventBus 请按照该模板进行创建
  onCurrentRouterChange: createEventBus<RouteLocationNormalized>('onCurrentRouterChange')
}
