import http from '@/utils/http'
import { EmailSetting, SendTestEmailInput } from './typing'

const baseUrl = '/api/setting-management'

const url = {
  getEmailSetting: `${baseUrl}/emailing`,
  updateEmailSetting: `${baseUrl}/emailing`,
  sendTestEmail: `${baseUrl}/send-test-email`
}

export const emailSettingsApi = {
  url,
  getEmailSetting() {
    return http.get<EmailSetting>(url.getEmailSetting)
  },
  updateEmailSetting(emailSetting: EmailSetting) {
    return http.post(url.getEmailSetting, emailSetting)
  },
  sendTestEmail(emailOption: SendTestEmailInput) {
    return http.post(url.sendTestEmail, emailOption)
  }
}
