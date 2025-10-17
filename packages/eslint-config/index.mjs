import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'
import tailwind from 'eslint-plugin-better-tailwindcss'
import nodePlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import jsxA11y from './eslint-plugin-jsx-a11y.mjs'
import reactRefreshConfig from './eslint-plugin-react-refresh.mjs'
import sort from './eslint-plugin-simple-import-sort.mjs'

/**
 * Generate ESLint configuration for a project. This is an opinionated Typescript & stylistic configuration.
 * @type {import('./index').CustomizeFn}
 */
export const configure = (
	{
		includeReact = true,
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
		/**
		 * Additional configs to append to the end of the configuration.
		 * @type {import('eslint').Linter.Config[]}
		 */
		appendConfigs = [],
		debug = false
	}) => {
	const lintConfigs = [
		{
			ignores: ['**/node_modules/*', '**/dist/', '**/precompiled/*', '**/*.json', ...ignores] // global ignore with single ignore key
		},
		// all projects:
		eslint.configs.recommended,
		tseslint.configs.recommended,

		// JSX specific rules
		...(includeReact
			? [...jsxA11y,
					reactHooks.configs.flat.recommended,
					reactRefreshConfig,
					tailwind.config
				]
			: []),

		stylistic.configs.customize(stylisticInit),

		sort,

		{
			plugins: {
				promise: promisePlugin,
				...(includeReact ? { react: reactPlugin } : {})
			},
			languageOptions: {
				ecmaVersion: 2022,
				globals: {
					...globals.browser,
					...globals.node,
					...globals.es2023
				}
			},
			rules: {
				...promisePlugin.configs.recommended.rules,

				...(includeReact
					? {
							...reactPlugin.configs.recommended.rules,
							...reactPlugin.configs['jsx-runtime'].rules
						}
					: {}),

				// custom rules here
				'promise/always-return': ['error', { ignoreLastCallback: true }],

				'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unused-vars': ['error', {
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}],
				'no-useless-rename': ['error', {
					ignoreDestructuring: false,
					ignoreImport: false,
					ignoreExport: false
				}],
				'object-shorthand': ['error', 'always']
			},

			settings: {
				...(includeReact
					? {
							react: {
								version: 'detect' // You can add this if you get a warning about the React version when you lint
							}
						}
					: {})
			}
		},
		(monoRepoNodeProjects.length > 0 && ({
			// node rules
			files: monoRepoNodeProjects.map(path => `${path}/**/*`),

			plugins: {
				n: nodePlugin
			},

			rules: {
				...nodePlugin.configs['flat/recommended'].rules,

				// custom

				'n/no-extraneous-import': ['error', {
					allowModules: [...monoRepoPackages]
				}]
			}
		})),
		// testing rules
		{
			files: ['**/*.test.ts', '**/*.test.tsx', '**/*.test.mts', '**/*.test.cts', '**/__tests__/**/*', '**/__mocks__/**/*'],
			rules: {
				'@typescript-eslint/no-unused-expressions': 'off',
				'@stylistic/max-statements-per-line': ['error', { max: 2 }]
			}
		},
		// configuration rules
		{
			files: ['**/*.config.*'],
			rules: {
				'@typescript-eslint/no-require-imports': 'off',
				'n/no-unpublished-import': 'off',
				'@stylistic/max-statements-per-line': 'off'
			}
		},
		...appendConfigs
	]
	if (debug) {
		console.dir(lintConfigs.filter(c => !!c), { depth: 2, colors: true })
	}
	return [
		...defineConfig(lintConfigs.filter(c => !!c))
	]
}
