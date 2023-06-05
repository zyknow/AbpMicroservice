/**
 * 将整数部分逢三一断
 * @param value
 * @return string
 */
export const NumberFormat = (value?: string | number): string => {
  return value ? value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0'
}

export const FormatWan = (val: number): [number, string] | null => {
  const v = val * 1
  if (!v || Number.isNaN(v)) return null
  let result = [val, ''] as [number, string]
  if (val > 10000) {
    result = [Math.floor(val / 10000), '万']
  }
  return result
}
