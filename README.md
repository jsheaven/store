<h1 align="center">@jsheaven/store</h1>

> A reactive, observed and auto-persisted object store

<h2 align="center">User Stories</h2>

1. As a developer, I want to have an object store simply persisted
2. As a developer, I want to hook into changes at every depth reactively

<h2 align="center">Features</h2>

- ✅ Offers the `@jsheaven/observed` reactive object API
- ✅ Integrates with `simply-persist` to save on any change
- ✅ Available as a simple API
- ✅ Just `354 byte` nano sized (ESM, gizpped)
- ✅ Tree-shakable and side-effect free
- ✅ Runs on Windows, Mac, Linux, CI tested
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">Example usage</h2>

<h3 align="center">Setup</h3>

- yarn: `yarn add @jsheaven/store`
- npm: `npm install @jsheaven/store`

<h3 align="center">ESM</h3>

```ts
import { store } from '@jsheaven/store'

export interface MyStore {
  a: boolean
  b: number
  c: {
    foo: string
  }
}

const myStore = await store<MyStore>({
  name: 'myStore',
  initialValue: { a: true, b: 1, c: { foo: 'nice!' }} },
  provider: 'session' // from `simply-persist`; persists to SessionStorage
})
```

<h3 align="center">CommonJS</h3>

```ts
const { store } = require('@jsheaven/store')

// same API like ESM variant
```
