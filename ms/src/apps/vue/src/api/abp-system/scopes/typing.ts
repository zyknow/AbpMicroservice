export interface Scope {
  id: string
  name: string
  displayName: string
  description: string
  buildIn: boolean
  resources: string[]
  extraProperties: any
}

export type CreateScopeInput = UpdateScopeInput

export interface UpdateScopeInput {
  name: string
  displayName: string
  description: string
  resources: string[]
}
