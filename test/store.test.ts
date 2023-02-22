import { jest } from '@jest/globals'
import { SpiedFunction } from 'jest-mock'
import { store } from '../dist/index.esm'
import { getStorage } from 'simply-persist'
import { observed } from '@jsheaven/observed'

describe('store', () => {
  it('is defined', () => {
    expect(store).toBeDefined()
  })

  let getStorageSpy: SpiedFunction<typeof getStorage>
  let observedSpy: SpiedFunction<typeof observed>

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
})
