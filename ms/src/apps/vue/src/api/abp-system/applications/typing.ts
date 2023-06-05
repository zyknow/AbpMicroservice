export interface Application {
  clientId: string
  displayName: string
  type: ApplicationType
  clientSecret: string
  consentType?: ApplicationConsentType
  postLogoutRedirectUris: string[]
  redirectUris: string[]
  allowPasswordFlow: boolean
  allowClientCredentialsFlow: boolean
  allowAuthorizationCodeFlow: boolean
  allowRefreshTokenFlow: boolean
  allowHybridFlow: boolean
  allowImplicitFlow: boolean
  allowLogoutEndpoint: boolean
  allowDeviceEndpoint: boolean
  scopes: string[]
  clientUri: string
  logoUri: string
  id: string
  extraProperties: any
}

export type CreateApplicationInput = UpdateApplicationInput

export interface UpdateApplicationInput {
  clientId: string
  displayName: string
  type: ApplicationType
  clientSecret: string
  consentType?: ApplicationConsentType
  postLogoutRedirectUris: string[]
  redirectUris: string[]
  allowPasswordFlow: boolean
  allowClientCredentialsFlow: boolean
  allowAuthorizationCodeFlow: boolean
  allowRefreshTokenFlow: boolean
  allowHybridFlow: boolean
  allowImplicitFlow: boolean
  allowLogoutEndpoint: boolean
  allowDeviceEndpoint: boolean
  scopes: string[]
  clientUri: string
  logoUri: string
}

export interface CheckOpeniddictApplicationInput {
  clientId: string
  postLogoutRedirectUri: string
  redirectUri: string
}

export enum ApplicationType {
  'confidential' = 'confidential',
  'public' = 'public'
}
export enum ApplicationConsentType {
  'implicit' = 'implicit',
  'explicit' = 'explicit',
  'external' = 'external',
  'systematic' = 'systematic'
}
