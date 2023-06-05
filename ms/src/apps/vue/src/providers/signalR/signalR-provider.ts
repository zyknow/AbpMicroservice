import { SimpleHub } from './hubs/simple'

export const hubs = {
  simple: new SimpleHub({
    autoStart: false,
    serverUrl: 'http://localhost:5000/signalr'
  })
}
