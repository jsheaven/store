import { jest } from '@jest/globals'
import { store } from '../dist/index.esm'

describe('store', () => {
  it('is defined', () => {
    expect(store).toBeDefined()
  })

  const initialValue = { foo: 'bar' }
  const name = 'test-store'

  it('should call getStorage with memory provider when running on the server', async () => {
    const storage = { foo: 'bar' }

    const result = await store({ name, initialValue })

    expect(result).toEqual(storage)
  })

  it('should call getStorage with local provider when running on the client', async () => {
    const storage = { foo: 'bar' }

    globalThis.window = {
      // @ts-ignore
      document: {},
    }

    const result = await store({ name, initialValue })

    expect(result).toEqual(storage)
  })

  it('throws an error when name is not given', async () => {
    try {
      // @ts-ignore
      await store({ name: undefined, initialValue })
      expect(true).toBe(false)
    } catch (e) {
      expect(e.message).toBe('Option name must be defined')
    }
  })

  it('can set onSet globally and is called', async () => {
    let onSet = jest.fn(() => {})
    const s = await store<{ b: number }>({
      name: 'foo',
      initialValue: { b: 1 },
      observeOptions: {
        onSet,
      },
    })

    s.b = 123

    expect(onSet).toHaveBeenCalledTimes(1)
  })

  it('works with undefined initialValue', async () => {
    let onSet = jest.fn(() => {})
    const s = await store<{ b: number }>({
      name: 'foo',
      initialValue: undefined,
      observeOptions: {
        onSet,
      },
    })

    s.b = 123

    expect(onSet).toHaveBeenCalledTimes(1)
  })

  it('works with undefined initialValue', async () => {
    let onSet = jest.fn(() => {})
    const s = await store<{ b: number }>({
      name: 'foo',
      initialValue: undefined,
      observeOptions: {
        // @ts-ignore
        onSet: 'lala',
      },
    })

    s.b = 123

    expect(onSet).toHaveBeenCalledTimes(0)
  })

  it('reads and persists using middleware functions', async () => {
    let onSet = jest.fn(() => {})
    let SetMiddleware = jest.fn(async (key, value: any) => {
      console.log('SetMiddleware key', key, 'value', value)
      return { encrypted: value }
    })
    let GetMiddleware = jest.fn(async (key, value: any) => {
      console.log('GetMiddleware key', key, 'value', value)
      return value.encrypted
    })
    const s = await store<{ b: number }>({
      name: 'crytoFoo',
      provider: 'memory',
      persistOptions: {
        setMiddleware: SetMiddleware as any,
        getMiddleware: GetMiddleware as any,
      },
    })

    s.b = 123

    expect(onSet).toHaveBeenCalledTimes(0)
    expect(SetMiddleware).toHaveBeenCalledTimes(1)
    expect(GetMiddleware).toHaveBeenCalledTimes(0)
    expect(s.b).toEqual(123)
  })

  it('reads and persists using middleware functions (read after save)', async () => {
    let onSet = jest.fn(() => {})
    let SetMiddleware = jest.fn(async (key, value: any) => {
      // simulate encryption
      return { encrypted: value }
    })
    let GetMiddleware = jest.fn(async (key, value: any) => {
      // simulate decryption
      return value.encrypted
    })
    const s = await store<{ b: number }>({
      name: 'crytoFoo',
      provider: 'memory',
      persistOptions: {
        setMiddleware: SetMiddleware as any,
        getMiddleware: GetMiddleware as any,
      },
    })

    expect(s.b).toEqual(123) // has been persisted before

    s.b = 123

    expect(onSet).toHaveBeenCalledTimes(0)
    expect(SetMiddleware).toHaveBeenCalledTimes(1)
    expect(GetMiddleware).toHaveBeenCalledTimes(1)
    expect(s.b).toEqual(123)
  })
})
