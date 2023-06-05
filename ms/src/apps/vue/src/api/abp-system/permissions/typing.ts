export interface PermissionGroup {
  entityDisplayName: string
  groups: [
    {
      name: string
      displayName: string
      displayNameKey: string
      displayNameResource: string
      permissions: [
        {
          name: string
          displayName: string
          parentName: string
          isGranted: boolean
          allowedProviders: [string]
          grantedProviders: [
            {
              providerName: string
              providerKey: string
            }
          ]
        }
      ]
    }
  ]
}

export interface UpdatePermissionInput {
  permissions: [
    {
      name: string
      isGranted: boolean
    }
  ]
}
