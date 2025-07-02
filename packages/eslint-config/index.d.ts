import type { ConfigArray } from '@eslint/config-array'
export { ConfigArray }
export interface CustomizeOptions {
	/**
	 * If true, enables React specific rules and plugins.
	 * This is useful for non-React projects or when using a different framework.
	 * Default is true.
	 */
	includeReact?: boolean
	/**
	 * If true, enables Tailwind CSS specific rules and plugins.
	 * This is useful for projects that use Tailwind CSS.
	 * Default is true.
	 */
	includeTailwind?: boolean
	/**
	 * List of package names that can be imported among workspaces in the monorepo.
	 */
	monoRepoPackages?: string[]
	/**
	 * List of Node.JS specific projects (paths relative to root) in this monorepo to apply Node specific rules
	 */
	monoRepoNodeProjects?: string[]
	/**
	 * Stylistic factory customization options.
	 *
	 * See: https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/dts/options.d.ts
	 */
	stylisticInit?: import('@stylistic/eslint-plugin').StylisticCustomizeOptions

	/**
	 * Additional global ignores
	 */
	ignores?: string[]
	/**
	 * Additional ESLint configs to append to the final config. Use this for custom rules at specific paths.
	 */
	appendConfigs?: ConfigArray
	/**
	 * Prints active configuration to the console when running lint.
	 *
	 * This uses `console.dir` (may be hidden from console output)
	 */
	debug?: boolean
}

export type CustomizeFn = (options?: CustomizeOptions) => ConfigArray
