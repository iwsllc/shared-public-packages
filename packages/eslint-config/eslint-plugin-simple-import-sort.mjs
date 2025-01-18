import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'

/** @type {import('@typescript-eslint/utils/ts-eslint').FlatConfig.Config} */
const simpleImportSortConfig = {
	plugins: Object.freeze({
		'simple-import-sort': simpleImportSortPlugin
	}),
	rules: Object.freeze({
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error'
	})
}

export default Object.freeze(simpleImportSortConfig)
