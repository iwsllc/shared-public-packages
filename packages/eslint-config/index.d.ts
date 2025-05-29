export interface CustomizeOptions {
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
	stylisticInit?: import('@stylistic/eslint-plugin/dts/options').StylisticCustomizeOptions

	/**
	 * Additional global ignores
	 */
	ignores?: string[]
	/**
	 * Additional ESLint configs to append to the final config. Use this for custom rules at specific paths.
	 */
	appendConfigs?: import('eslint').Linter.Config[]
	/**
	 * Prints active configuration to the console when running lint.
	 *
	 * This uses `console.dir` (may be hidden from console output)
	 */
	debug?: boolean
}
