import envConfig from '@/utils/env'
import { boot } from 'quasar/wrappers'

import '@/../types/extensions-array.d.ts'
import '@/../types/extensions-string.d.ts'

export default boot(async () => {
  console.log('baseUrl: ', envConfig.VITE_API_URL)
  console.log('authServerUrl: ', envConfig.VITE_AUTH_SERVER_URL)
})
