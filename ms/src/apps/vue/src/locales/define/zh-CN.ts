export default {
  global: {
    successfully: '成功',
    oprationSuccessfully: '操作成功',
    failed: '失败',
    oprationFailed: '操作失败',
    create: '创建',
    update: '编辑',
    delete: '删除',
    submit: '提交',
    cancel: '取消',
    confirm: '确认'
  },
  confirm: {
    defaultConfirmTitle: '确认操作',
    defaultConfirmMessage: '确认进行此操作？',
    updateConfirmTitle: '确认更新操作',
    updateConfirmMessage: '确认更新此记录？',
    createConfirmTitle: '确认创建操作',
    createConfirmMessage: '确认创建此记录？',
    deleteConfirmTitle: '确认删除操作',
    deleteConfirmMessage: '确认删除此记录？',
    deleteConfirmManyTitle: '确认批量删除操作',
    deleteConfirmManyMessage: '确认删除这些记录？ (共{count}条)'
  },
  auth: {
    '401Unauthorized': '未授权'
  },
  validation: {
    required: '必填',
    isPhone: '请输入正确的手机号码',
    isEmail: '请输入正确的邮箱地址',
    isIdentity: '请输入正确的身份证号码',
    isUrl: '请输入正确的网址',
    isNumber: '请输入数字',
    lengthBetween: '请输入{min}到{max}个字符',
    numberBetween: '请输入{min}到{max}个中间的数字',
    numberGreaterThen: '请输入大于{min}的数字',
    numberLessThen: '请输入小于{max}的数字',
    numberGreaterThenOrEqual: '请输入大于等于{min}的数字',
    numberLessThenOrEqual: '请输入小于等于{max}的数字'
  },
  router: {
    home: '首页',
    management: '管理',
    'management:tenantManagement': '租户管理',
    'management:tenantManagement:tenant': '租户',
    'management:identityManagement': '身份认证管理',
    'management:identityManagement:role': '角色',
    'management:identityManagement:user': '用户',
    'management:settingManagement': '设置',
    'management:auditLogging': '审计日志'
  },
  '404Page': {
    notFound: '页面不存在',
    goHome: '返回首页'
  }
}
