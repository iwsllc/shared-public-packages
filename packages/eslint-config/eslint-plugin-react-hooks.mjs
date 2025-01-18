import { fixupPluginRules } from '@eslint/compat'
import reactHooksPlugin, { configs } from 'eslint-plugin-react-hooks'

/** @type {import('@typescript-eslint/utils/ts-eslint').FlatConfig.Config} */
const reactHooksConfig = {
	plugins: Object.freeze({
		'react-hooks': fixupPluginRules(reactHooksPlugin)
	}),
	rules: Object.freeze({
		...configs.recommended.rules
	})
}

export default Object.freeze(reactHooksConfig)
