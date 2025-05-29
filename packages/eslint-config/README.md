# @iwsio/eslint-config

This is just my personal eslint configuration tool I use for my projects. 

See: [`./index.d.ts`](./index.d.ts) for option documentation.

## Default options:

```js
{
		monoRepoPackages = [],
		monoRepoNodeProjects = [],
		stylisticInit = {
			braceStyle: '1tbs',
			commaDangle: 'never',
			indent: 'tab',
			jsx: true,
			quotes: 'single',
			semi: false
		},
		ignores = [],
		appendConfigs = [],
		debug = false
	}
```

Override any one of these for your own configuration. Note that `debug` will print the final configuration to console before running. However, ESLint may hide this output. 

## Default ESLint configuration

See [index.mjs](https://github.com/iwsllc/shared-public-packages/blob/main/packages/eslint-config/index.mjs) for the full ESLint configuration. It's using [typescript-eslint](https://typescript-eslint.io/getting-started) and [stylistic customize factory](https://eslint.style/guide/config-presets). 

