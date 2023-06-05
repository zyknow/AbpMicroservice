import { i18n } from '@/boot/02-boot-i18n'

export type ValidationCrudRuleType = ReturnType<typeof useVaildation>['CrudR']

const { t } = i18n.global as any

const defineRule = {
  required: (value: any) => value?.length > 0 || t('validation.required'),
  isPhone: (value: string) => /^1[3456789]\d{9}$/.test(value) || t('validation.isPhone'),
  isEmail: (value: string) =>
    /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value) || t('validation.isEmail'),
  isIdentity: (value: string) =>
    /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) || t('validation.isIdentity'),
  isUrl: (value: string) =>
    /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(value) || t('validation.isUrl'),
  isNumber: (value: string) => /^[0-9]*$/.test(value.toString()) || t('validation.isNumber'),
  lengthBetween: (value: string, min: number, max: number) =>
    (value.length >= min && value.length <= max) || t('validation.lengthBetween', { min, max }),
  numberBetween: (value: number, min: number, max: number) =>
    (value >= min && value <= max) || t('validation.numberBetween', { min, max }),
  numberGreaterThen: (value: number, min: number) =>
    value > min || t('validation.numberGreaterThen', { min }),
  numberLessThen: (value: number, max: number) =>
    value < max || t('validation.numberLessThen', { max }),
  numberGreaterThenOrEqual: (value: number, min: number) =>
    value >= min || t('validation.numberGreaterThenOrEqual', { min }),
  numberLessThenOrEqual: (value: number, max: number) =>
    value <= max || t('validation.numberLessThenOrEqual', { max })
}

export const useVaildation = () => {
  type Rule = typeof defineRule
  type FuncType<T> = T extends (value: any, ...args: infer U) => infer R
    ? (...args: U) => (value: any) => R
    : never

  type TransformedDefineRule = {
    [P in keyof Rule]: FuncType<Rule[P]>
  }

  const transformDefineRule = (defineRule: Rule): TransformedDefineRule => {
    const transformed: any = {}

    for (const rule in defineRule) {
      if (typeof defineRule[rule] === 'function') {
        transformed[rule] =
          (...args: any[]) =>
          (value: any) =>
            defineRule[rule](value, ...args)
      }
    }

    return transformed
  }

  const transformedDefineRule = transformDefineRule(defineRule)

  return { R: defineRule, CrudR: transformedDefineRule }
}
