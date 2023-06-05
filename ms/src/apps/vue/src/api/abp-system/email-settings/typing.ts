export interface EmailSetting {
  smtpHost: string
  smtpPort: 25
  smtpUserName: string
  smtpPassword: string
  smtpDomain: string
  smtpEnableSsl: boolean
  smtpUseDefaultCredentials: boolean
  defaultFromAddress: string
  defaultFromDisplayName: string
}

export interface SendTestEmailInput {
  senderEmailAddress: string
  targetEmailAddress: string
  subject: string
  body: string
}
