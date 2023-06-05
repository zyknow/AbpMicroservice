import { abpApplicationConfigurationApi } from '@/api/abp-system/abp-application-configuration'
import { defineStore } from 'pinia'

interface AbpState {
  application: ApplicationConfigurationDto
}

export const useAbpStore = defineStore('Abp', {
  state: (): AbpState => ({
    application: {} as ApplicationConfigurationDto
  }),
  actions: {
    async initAbpApplicationConfiguration() {
      const { data } = await abpApplicationConfigurationApi.get(true)
      this.application = data
      console.log(`auth: `, data.auth?.grantedPolicies)
    }
  }
})
