export default {
  global: {
    successfully: 'Success',
    oprationSuccessfully: 'Operation successful',
    failed: 'Failed',
    oprationFailed: 'Operation failed',
    create: 'Create',
    update: 'Edit',
    delete: 'Delete',
    submit: 'Submit',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  confirm: {
    defaultConfirmTitle: 'Confirm Operation',
    defaultConfirmMessage: 'Are you sure you want to perform this operation?',
    updateConfirmTitle: 'Confirm Update Operation',
    updateConfirmMessage: 'Are you sure you want to update this record?',
    createConfirmTitle: 'Confirm Create Operation',
    createConfirmMessage: 'Are you sure you want to create this record?',
    deleteConfirmTitle: 'Confirm Delete Operation',
    deleteConfirmMessage: 'Are you sure you want to delete this record?',
    deleteConfirmManyTitle: 'Confirm Batch Delete Operation',
    deleteConfirmManyMessage:
      'Are you sure you want to delete these records? (Total {count} records)'
  },
  validation: {
    required: 'Required',
    isPhone: 'Please enter a valid phone number',
    isEmail: 'Please enter a valid email address',
    isIdentity: 'Please enter a valid ID card number',
    isUrl: 'Please enter a valid URL',
    isNumber: 'Please enter a number',
    lengthBetween: 'Please enter {min} to {max} characters',
    numberBetween: 'Please enter a number between {min} and {max}',
    numberGreaterThen: 'Please enter a number greater than {min}',
    numberLessThen: 'Please enter a number less than {max}',
    numberGreaterThenOrEqual: 'Please enter a number greater than or equal to {min}',
    numberLessThenOrEqual: 'Please enter a number less than or equal to {max}'
  },
  router: {
    home: 'Home',
    management: 'Management',
    'management:tenantManagement': 'Tenant Management',
    'management:tenantManagement:tenant': 'Tenant',
    'management:identityManagement': 'Identity Management',
    'management:identityManagement:role': 'Role',
    'management:identityManagement:user': 'User',
    'management:settingManagement': 'Settings'
  }
}
