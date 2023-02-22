<h1 align="center">@jsheaven/store</h1>

> A reactive, observed and auto-persisted object store

<h2 align="center">User Stories</h2>

1. As a developer, I want to have an object store simply persisted
2. As a developer, I want to hook into changes at every depth reactively

<h2 align="center">Features</h2>

- ✅ Does X and Y
- ✅ Available as a simple API and simple to use CLI
- ✅ Just `136 byte` nano sized (ESM, gizpped)
- ✅ Tree-shakable and side-effect free
- ✅ Runs on Windows, Mac, Linux, CI tested
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">Example usage (CLI)</h2>

`npx @jsheaven/store store --foo X`

> You need at least version 18 of [Node.js](https://www.nodejs.org) installed.

<h2 align="center">Example usage (API, as a library)</h2>

<h3 align="center">Setup</h3>

- yarn: `yarn add @jsheaven/store`
- npm: `npm install @jsheaven/store`

<h3 align="center">ESM</h3>

```ts
import { store } from '@jsheaven/store'

const result = await store({
  foo: 'X',
})
```

<h3 align="center">CommonJS</h3>

```ts
const { store } = require('@jsheaven/store')

// same API like ESM variant
```
