import { getStorage, PersistenceProvider, PersistenceProviderOptions } from 'simply-persist'
import { observed, ObserveOptions } from '@jsheaven/observed'
import { isServer } from 'runtime-info'

export interface StoreOptions<T extends object> {
  name: string
  initialValue?: T
  observeOptions?: ObserveOptions
  provider?: PersistenceProvider
  persistOptions?: PersistenceProviderOptions
}

export const store = async <T extends object>({
  name,
  initialValue,
  provider,
  observeOptions,
  persistOptions,
}: StoreOptions<T>): Promise<T> => {
  if (typeof name !== 'string' || !name) {
    throw new Error('Option name must be defined')
  }
  const storage = getStorage(provider || (isServer() ? 'memory' : 'local'), persistOptions)
  const observedObject = observed<T>(initialValue || ({} as T), {
    ...(observeOptions || {}),
    onSet: async (prop: PropertyKey, value: any, valueBefore: any, receiver: any) => {
      if (observeOptions && typeof observeOptions.onSet === 'function') {
        observeOptions.onSet(prop, value, valueBefore, receiver)
      }
      // persist the whole object at any change
      await storage.set(name, observedObject)
    },
  })

  await storage.set(name, observedObject)
  return observedObject
}
