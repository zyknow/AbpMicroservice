const generator = (
  router: AppRouteRecordRaw[],
  permissions?: { [key: string]: boolean }
): AppRouteRecordRaw[] => {
  const res = router
    .filter((r) => !r.meta?.hidden)
    .filter((r) => {
      const res =
        !r.meta ||
        !r.meta.abpPermission ||
        (permissions && permissions[`${r.meta.abpPermission}`] === true)
      return res
    })
    .map((r) => {
      if (r.children?.length) {
        r.children = generator(r.children, permissions)
      } else {
        delete r.children
      }

      if (!r.meta) {
        r.meta = {}
      }
      if (!r.meta.title) {
        r.meta.title = r.meta?.abpPermission || r.name!
      }

      if (!r.meta.icon) {
        r.meta.icon = ''
      }

      if (!r.children?.length) {
        delete r.children
      }

      return r
    })
    .filter((r) => r.component || r.children?.length)

  return res
}

const generatorDynamicRouter = (
  dynamicRouter: AppRouteRecordRaw[],
  permissions?: { [key: string]: boolean }
) => {
  return generator(dynamicRouter, permissions)
}

export default generatorDynamicRouter
