<template>
  <div class="select-none">
    <!-- quasar nav -->
    <div v-for="(router, index) in routers" :key="index">
      <div v-if="!router.meta?.hidden">
        <div v-if="!router.children" class="rounded-lg overflow-hidden">
          <q-expansion-item
            :header-inset-level="level"
            expand-icon="1"
            :to="router.path"
            :icon="router.meta?.icon || ' '"
            :label="$t(router.meta?.title!)"
          />
        </div>
        <div v-else>
          <q-expansion-item
            v-model="expansions[router.path]"
            :duration="100"
            expand-separator
            :header-inset-level="level"
            :icon="router.meta?.icon"
            :label="$t(router.meta?.title!)"
          >
            <menu-item :routers="router.children" :level="level ? level + 0.3 : 0.3" />
          </q-expansion-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { eventBus } from '@/providers/evnet-bus-provider'
import { RouteRecordNormalized, useRouter } from 'vue-router'

const { onCurrentRouterChange } = eventBus

const props = defineProps<{ level?: number; routers: AppRouteRecordRaw[] }>()

const expansions = reactive<{ [path: string]: boolean }>({})

props.routers.forEach((router) => {
  if (router.children?.length) expansions[router.path] = false
})

const expandItemByRouter = (routerMatched: RouteRecordNormalized[]) => {
  routerMatched.forEach((router) => {
    if (expansions[router.path] !== undefined) {
      expansions[router.path] = true
    }
  })
}

onMounted(() => {
  const router = useRouter()
  // 自动展开匹配到的路由菜单
  expandItemByRouter(router.currentRoute.value.matched)
})

onCurrentRouterChange.on((to) => {
  // 自动展开匹配到的路由菜单
  expandItemByRouter(to.matched)
})
</script>
<style lang="scss" scoped></style>
