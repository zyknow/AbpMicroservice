/* eslint-disable */
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
  }
}

export interface GlobEnvConfig {
  // Service interface url
  VITE_API_URL: string

  // STS connect
  VITE_AUTH_SERVER_URL: string
  VITE_AUTH_CLIENT_ID: string
  VITE_AUTH_CLIENT_SECRET: string

  // Multi-tenancy key
  VITE_MULTITENANCY_KEY: string
}
