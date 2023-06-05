export interface FeatureGroup {
  groups: [
    {
      name: string
      displayName: string
      features: [
        {
          name: string
          displayName: string
          value: string
          provider: {
            name: string
            key: string
          }
          description: string
          valueType: {
            name: string
            properties: {
              additionalProp1: string
              additionalProp2: string
              additionalProp3: string
            }
            validator: {
              name: string
              properties: {
                additionalProp1: string
                additionalProp2: string
                additionalProp3: string
              }
            }
          }
          depth: number
          parentName: string
        }
      ]
    }
  ]
}

export interface UpdateFeatureInput {
  features: [
    {
      name: string
      value: string
    }
  ]
}
