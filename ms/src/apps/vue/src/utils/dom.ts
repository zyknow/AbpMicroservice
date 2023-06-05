export type BasicTarget<T = HTMLElement> = (() => T | null) | T | null | Ref<T | null | undefined>

export type TargetElement = ComponentPublicInstance | HTMLElement | Element | Document | Window

export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement
  }

  let targetElement: TargetElement | undefined | null

  if (typeof target === 'function') {
    targetElement = target()
  } else if ('value' in target) {
    targetElement = (target.value as ComponentPublicInstance)?.$el
  } else {
    targetElement = target
  }

  return targetElement
}
