/**
 * 是否开发环境
 */
export const isDev = process.env.NODE_ENV == 'development'
/**
 * key值遍历赋值资源
 * @param resource 被赋值资源
 * @param byObj 赋值资源
 * @param useResourceKey 使用被赋值资源键做遍历
 * @param ignoreError 忽略赋值错误
 */
export const copyByKeys = (
  resource: any,
  byObj: any,
  useResourceKey?: boolean,
  ignoreError = false
): void => {
  if (resource && byObj) {
    const foreachObj = useResourceKey ? resource : byObj
    Object.keys(foreachObj).forEach((k) => {
      if (!ignoreError) {
        resource[k] = byObj[k]
      } else {
        try {
          resource[k] = byObj[k]
        } catch (error) {}
      }
    })
  }
}

/**
 * 延时 time 毫秒
 * @param time
 * @returns
 */
export const sleepAsync = (time?: number): Promise<void> => {
  if (!time) return Promise.resolve()

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
export const inTypeByFields = (fields: string[], type: unknown): boolean => {
  for (const field of fields) {
    if (!inType(field, type)) return false
  }
  return true
}

export const inType = (field: string, type: any): boolean => {
  return field in type
}
