import axios from 'axios'
import { registerHttpHandler } from './handlers'
import envConfig from '@/utils/env'

const http = axios.create({
  baseURL: envConfig.VITE_API_URL,
  timeout: 60000,
  withCredentials: false
}) as unknown as AxiosInstance

registerHttpHandler(http)

export default http
