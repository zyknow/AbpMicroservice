import type { RouteRecordRaw } from 'vue-router'

declare global {
  declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta?: RouteMeta
    component?: Component | string
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
  }

  declare interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta?: RouteMeta
    component: string
    path: string
    redirect: string
    children?: AppCustomRouteRecordRaw[]
  }

  declare interface RouteMeta extends Record<string | number | symbol, unknown> {
    hidden?: boolean
    title?: string
    icon?: string
    keepAlive?: boolean
    abpPermission?: string
  }

  declare type VNodeComponent = VNode | Component | DefineComponent
}
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    hidden?: boolean
    title?: string
    icon?: string
    keepAlive?: boolean
    abpPermission?: string
  }
}
