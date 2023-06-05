import { ss } from '@/providers/storage-provider'
import { UserManager } from 'oidc-client-ts'
import { RouteLocationNormalized } from 'vue-router'
import envConfig from './env'

const host = window.location.origin
const authserverUrl = envConfig.VITE_AUTH_SERVER_URL

export const oidcManager = new UserManager({
  authority: authserverUrl, // server 地址
  client_id: envConfig.VITE_AUTH_CLIENT_ID, // client id
  post_logout_redirect_uri: `${host}/signout-callback-oidc`, // 退出登录
  redirect_uri: `${host}/signin-callback-oidc`,
  silent_redirect_uri: `${host}/signin-callback-oidc`,
  accessTokenExpiringNotificationTimeInSeconds: 4, // 超时
  silentRequestTimeoutInSeconds: 2000, //
  response_type: 'code',
  scope: 'openid IdentityService AdministrationService SaasService ProductService offline_access',
  filterProtocolClaims: true,
  automaticSilentRenew: true
})

const signCallBack: {
  [key: string]: {
    url: string
    handler: (to: RouteLocationNormalized) => Promise<any> | undefined
  }
} = {
  signIn: {
    url: '/signin-callback-oidc',
    handler: async (to: RouteLocationNormalized) => {
      if (to.path == signCallBack.signIn.url) {
        const user = await oidcManager
          .signinRedirectCallback()
          .catch((e) => console.error('signin-callback-oidc 错误信息' + e))
        if (user) {
          let toPath = ss.signin_succeeded_to_path.get()
          for (const key in signCallBack) {
            const { url } = signCallBack[key]
            if (toPath == url) {
              toPath = '/'
              break
            }
          }

          ss.signin_succeeded_to_path.remove()
          return { path: toPath, replace: true }
        }
      }
    }
  },
  signOut: {
    url: '/signout-callback-oidc',
    handler: async (to: RouteLocationNormalized) => {
      if (to.path == signCallBack.signIn.url) {
        await oidcManager.signoutRedirectCallback()
        return { path: '/', replace: true }
      }
    }
  }
}

export const oidcHandler = async (to: RouteLocationNormalized) => {
  for (const key in signCallBack) {
    const sign = signCallBack[key]
    const res = sign.handler(to)
    if (res) return res
  }
}

export const useOidcManager = () => {
  return oidcManager
}

oidcManager.events.addUserSignedOut(async () => {
  await oidcManager.removeUser()
  await oidcManager.signinRedirect()
})
