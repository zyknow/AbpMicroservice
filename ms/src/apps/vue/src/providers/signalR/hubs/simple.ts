import { createSignalRModel } from '@/utils/signalR'
import { BaseHub } from './base'

enum onName {
  'ReceiveMessage' = 'ReceiveMessage'
}

export class SimpleHub extends BaseHub {
  constructor(model: createSignalRModel) {
    super(model)

    this.connection.on(onName.ReceiveMessage, (message: string) => {
      this.eventBus.emit(onName.ReceiveMessage, message)
    })
  }

  sendMessage = (str: string): Promise<string> =>
    this.connection!.invoke<string>('SendMessage', str)

  onMessage = (callback: (message: string) => void) => {
    this.eventBus.on(onName.ReceiveMessage, callback)
  }
}
