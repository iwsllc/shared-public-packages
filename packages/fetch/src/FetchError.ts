import { ErrorBody } from './types.js'

export class FetchError<T extends Partial<ErrorBody>> extends Error {
	body: string | T | undefined
	isJson: boolean
	status: number | undefined

	constructor(message: string, status: number | undefined, body: T | string | undefined) {
		super(message)
		this.status = status
		this.body = body
		this.isJson = typeof body !== 'string'
	}

	toString() {
		let message
		if (!this.isJson) message = this.body
		else message = (this.body as T).error ?? 'No server response.'
		return `Request failed.\nStatus: ${this.status}\nResponse from server:\n${message}`
	}
}
