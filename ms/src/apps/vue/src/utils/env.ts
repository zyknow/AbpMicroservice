import { GlobEnvConfig } from 'types/env'

const envConfig: GlobEnvConfig = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_MULTITENANCY_KEY: import.meta.env.VITE_MULTITENANCY_KEY,
  VITE_AUTH_SERVER_URL: import.meta.env.VITE_AUTH_SERVER_URL,
  VITE_AUTH_CLIENT_ID: import.meta.env.VITE_AUTH_CLIENT_ID,
  VITE_AUTH_CLIENT_SECRET: import.meta.env.VITE_AUTH_CLIENT_SECRET
}

// VITE_API_URL 末尾存在 / 则删除
if (envConfig.VITE_API_URL.endsWith('/')) {
  envConfig.VITE_API_URL = envConfig.VITE_API_URL.slice(0, -1)
}

// VITE_AUTH_SERVER_URL 末尾存在 / 则删除
if (envConfig.VITE_AUTH_SERVER_URL.endsWith('/')) {
  envConfig.VITE_AUTH_SERVER_URL = envConfig.VITE_AUTH_SERVER_URL.slice(0, -1)
}

export default envConfig
