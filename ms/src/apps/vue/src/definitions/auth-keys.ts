export default {
  featureManagement: { manageHostFeatures: 'FeatureManagement.ManageHostFeatures' },
  identity: {
    roles: {
      main: 'AbpIdentity.Roles',
      create: 'AbpIdentity.Roles.Create',
      delete: 'AbpIdentity.Roles.Delete',
      managePermissions: 'AbpIdentity.Roles.ManagePermissions',
      update: 'AbpIdentity.Roles.Update'
    },
    users: {
      main: 'AbpIdentity.Users',
      create: 'AbpIdentity.Users.Create',
      delete: 'AbpIdentity.Users.Delete',
      managePermissions: 'AbpIdentity.Users.ManagePermissions',
      update: 'AbpIdentity.Users.Update'
    },
    organizationUnits: 'AbpIdentity.OrganizationUnits',
    claimTypes: 'AbpIdentity.ClaimTypes',
    settingManagement: 'AbpIdentity.SettingManagement',
    userLookup: 'AbpIdentity.UserLookup',
    securityLogs: 'AbpIdentity.SecurityLogs'
  },
  settingManagement: {
    emailing: 'SettingManagement.Emailing',
    test: 'SettingManagement.Emailing.Test'
  },
  saas: {
    tenants: {
      main: 'AbpTenantManagement.Tenants',
      create: 'AbpTenantManagement.Tenants.Create',
      delete: 'AbpTenantManagement.Tenants.Delete',
      manageConnectionStrings: 'AbpTenantManagement.Tenants.ManageConnectionStrings',
      manageFeatures: 'AbpTenantManagement.Tenants.ManageFeatures',
      update: 'AbpTenantManagement.Tenants.Update'
    },
    editions: 'Saas.Editions'
  },
  auditLogging: {
    auditLogs: {
      main: 'SharpAbpAuditLogging.AuditLogs',
      create: 'SharpAbpAuditLogging.AuditLogs.Create',
      delete: 'SharpAbpAuditLogging.AuditLogs.Delete',
      update: 'SharpAbpAuditLogging.AuditLogs.Update'
    }
  },
  openIddictPro: {
    application: 'OpenIddictPro.Application',
    scope: 'OpenIddictPro.Scope'
  },
  account: {
    settingManagement: 'AbpAccount.SettingManagement'
  }
}
