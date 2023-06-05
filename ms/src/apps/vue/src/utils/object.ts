export const objectMapperKey = <T = any>(object: T, cascade = true): T => {
  return genObjectMapperKey(object, undefined, cascade) as T
}

const genObjectMapperKey = (object: any, parentKey?: string, cascade = true) => {
  const rtObj = {}
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      if (typeof object[key] == 'object') {
        if (cascade) {
          rtObj[key] = genObjectMapperKey(object[key], key, cascade)
        }
        // else {
        //   rtObj[key] = `${parentKey}.${key}`
        // }
      }
      // else {
      //   rtObj[key] = `${parentKey}.${key}`
      // }
      rtObj[key] = `${parentKey}.${key}`
    }
  }
  return rtObj
}
