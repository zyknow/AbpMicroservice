export interface OptionType<T = any> {
  label: string
  value: T
}

/**
 * 枚举转option {label,value}
 * @param enumSrc
 * @returns
 */
export function enumToOption<T>(enumSrc: T) {
  const options = fromEnum(enumSrc, ([label, value]) => ({
    label,
    value
  }))
  if (!options?.length) {
    return Object.keys(enumSrc!).map((k) => {
      {
        return {
          label: k,
          value: enumSrc[k]
        }
      }
    })
  } else return options
}

export function isEnumKey<T>(enumSrc: T, key: unknown): key is keyof T {
  return Number.isInteger(enumSrc[key as keyof T])
}

export function isEnumValue<T>(enumSrc: T, value: unknown): value is T[keyof T] {
  return Number.isInteger(enumSrc[enumSrc[value as keyof T] as any as keyof T])
}

function enumToKeys<T>(enumSrc: T): (keyof T)[] {
  return Object.keys(enumSrc!).filter((key: keyof T | any) =>
    isEnumKey(enumSrc, key)
  ) as (keyof T)[]
}

function enumToValues<T>(enumSrc: T): T[keyof T][] {
  return enumToKeys(enumSrc).map((key: keyof T) => enumSrc[key])
}
function enumValueToKey<T>(enumSrc: T, value: T[keyof T]): keyof T | undefined {
  return (enumSrc as any)[value]
}

function enumToEntries<T>(enumSrc: T): [keyof T, T[keyof T]][] {
  return enumToValues(enumSrc).map((value: T[keyof T]) => [
    enumValueToKey(enumSrc, value) as keyof T,
    value
  ])
}

function fromEnum<T, C>(
  enumSrc: T,
  projection: (item: [keyof T, T[keyof T]], index: number, array: [keyof T, T[keyof T]][]) => C,
  skip?: (value: [keyof T, T[keyof T]], index: number, array: [keyof T, T[keyof T]][]) => boolean
) {
  let entries = enumToEntries(enumSrc)

  if (skip) entries = entries.filter(skip)
  return entries.map(projection)
}
