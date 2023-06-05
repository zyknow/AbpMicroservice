/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */
declare interface String {
  /**
   * 格式化字符串
   * @param formatted 需要处理的字符串
   * @param args 参数列表，可以是数组，也可以是对象
   * @returns 返回格式化的字符串
   * @example format('Hello, {0}!', ['World'])
   * @example format('Hello, {name}!', {name: 'World'})
   */
  format(args: object | any[]): string
  /**
   * 将字符串 JSON.parse 为指定类型
   */
  JsonConvertTo<T>(): T

  /**
   * 首字母大写
   */
  toUpperFirst(): string
}

String.prototype.format = function () {
  if (arguments.length == 0) return this
  const args = arguments[0]
  let str = this
  if (Array.isArray(args)) {
    for (let i = 0; i < args.length; i++) {
      const regexp = new RegExp('\\{' + i + '\\}', 'gi')
      str = str.replace(regexp, args[i])
    }
  } else if (typeof args === 'object') {
    const keys = Object.keys(args)
    if (keys.length === 0) return str
    keys.forEach((key) => {
      const regexp = new RegExp('\\{' + key + '\\}', 'gi')
      str = str.replace(regexp, args[key])
    })
  }
  return str
}

String.prototype.JsonConvertTo<T> = function () {
  if (!this || this.length === 0) return {}
  try {
    return JSON.parse(this)
  } catch {
    return this as T
  }
}

String.prototype.toUpperFirst = function () {
  if (this === undefined || this === null || this === '' || this === ' ') return this

  return this.charAt(0).toUpperCase() + this.slice(1)
}
