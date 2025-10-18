# @iwsio/eslint-config

This is just my personal eslint configuration tool I use for my monorepo Typescript projects.

See: [`./index.d.ts`](./index.d.ts) for option documentation.

## Default options:
`configure` is now `async` and returns a promise due to recent changes. 

```js
export async function configure({
		includeReact: true,
		includeTailwind: true, // assuming tailwind v4
		autoFindMonorepoPackages = false,
		rootDir = undefined,
		monoRepoPackages = [],
		monoRepoNodeProjects = [],
		stylisticInit = {
			braceStyle: '1tbs',
			commaDangle: 'never',
			indent: 'tab', // use '2' for spaces
			jsx: true,
			quotes: 'single',
			semi: false
		},
		ignores = [],
		appendConfigs = [],
		debug = false
	}): Promise<ConfigArray>
```

## Full example
```js
// Example eslint.config.mjs for monorepo using either package.json workspaces or pnpm-workspace.yaml
// will determine package names based on config and include them in allowed import rules.
import { configure } from '@iwsio/eslint-config'
import { fileURLToPath } from 'node:url'

// determine full root path of your monorepo
const rootDir = fileURLToPath(new URL('.', import.meta.url))

// meant for browser only projects
const excludeWorkspacesFromNodeRules = ['apps/main', 'packages/ui-proj']

const configs = await configure({
  autoFindMonorepoPackages: true,
  rootDir,
  excludeWorkspacesFromNodeRules
})

export default configs
```


Override any one of these for your own configuration. Note that `debug` will print the final configuration to console before running. However, ESLint may hide this output. 

## Default ESLint configuration

 - See [index.mjs](https://github.com/iwsllc/iwsio-packages/blob/main/packages/eslint-config/index.mjs) for the full ESLint configuration.
 - [typescript-eslint](https://typescript-eslint.io/getting-started)
 - [stylistic customize factory](https://eslint.style/guide/config-presets). 

