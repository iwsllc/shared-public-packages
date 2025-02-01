import { ErrorBody } from './types.js'

export const isErrorBody = (body: unknown): body is ErrorBody => {
	if (body == null) return false
	return typeof body === 'object' && 'error' in body
}
