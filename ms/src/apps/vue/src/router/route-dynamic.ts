import { t } from '@/boot/02-boot-i18n'
import authKeys from '@/definitions/auth-keys'
import mainLayout from '@/layouts/main-layout/index.vue'

const router = () => {
  const router: AppRouteRecordRaw[] = [
    {
      path: '/',
      name: 'Root',
      redirect: '/Home',
      component: mainLayout,
      children: [
        {
          path: '/Home',
          name: 'Home',
          meta: {
            title: t('router.home'),
            icon: 'r_home',
            keepAlive: true
          },
          component: () => import('@/pages/home/index.vue')
        },
        {
          path: '/Management',
          name: 'Management',
          meta: {
            title: t('router.management'),
            icon: 'r_build',
            keepAlive: true
          },
          children: [
            {
              path: '/Management/Identity',
              name: 'IdentityManagement',
              meta: {
                title: t('router.management:identityManagement'),
                icon: 'r_manage_accounts',
                keepAlive: true
              },
              children: [
                {
                  path: '/Management/Identity/Role',
                  name: 'IdentityRoleManagement',
                  meta: {
                    title: t('router.management:identityManagement:role'),
                    keepAlive: true,
                    abpPermission: authKeys.identity.roles.main
                  },
                  component: () => import('@/pages/managements/identitys/role/index.vue')
                },
                {
                  path: '/Management/Identity/User',
                  name: 'IdentityUserManagement',
                  meta: {
                    title: t('router.management:identityManagement:user'),
                    keepAlive: true,
                    abpPermission: authKeys.identity.users.main
                  },
                  component: () => import('@/pages/managements/identitys/user/index.vue')
                }
              ]
            },
            {
              path: '/Management/TenantManagement',
              name: 'TenantManagement',
              meta: {
                title: t('router.management:tenantManagement'),
                icon: 'supervised_user_circle',
                keepAlive: true
              },
              children: [
                {
                  path: '/Management/TenantManagement/Tenant',
                  name: 'Tenant',
                  meta: {
                    title: t('router.management:tenantManagement:tenant'),
                    keepAlive: true,
                    abpPermission: authKeys.auditLogging.auditLogs.main
                  },
                  component: () => import('@/pages/managements/tenants/tenant/index.vue')
                }
              ]
            },
            {
              path: '/Management/AuditLogs',
              name: 'AuditLogs',
              meta: {
                icon: 'receipt',
                title: t('router.management:auditLogging'),
                keepAlive: true,
                abpPermission: authKeys.saas.tenants.main
              },
              component: () => import('@/pages/managements/audit-logs/index.vue')
            },
            {
              path: 'Management/SettingManagement',
              name: 'SettingManagement',
              meta: {
                title: t('router.management:settingManagement'),
                icon: 'settings',
                keepAlive: true
              },
              component: () => import('@/pages/managements/settings/index.vue')
            }
          ]
        }
      ]
    }
  ]
  return router
}

export default router
