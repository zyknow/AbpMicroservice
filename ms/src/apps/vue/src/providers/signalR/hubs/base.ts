import { createSignalRModel, createSignalR } from '@/utils/signalR'
import { EventBus } from 'quasar'

export class BaseHub {
  protected eventBus: EventBus = new EventBus()

  connection: ReturnType<typeof createSignalR>

  constructor(model: createSignalRModel) {
    this.connection = createSignalR(model)
  }
}
