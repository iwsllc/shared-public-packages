import { FetchError } from './FetchError.js'
import { isErrorBody } from './isErrorBody.js'
import { ErrorBody, FetchResponse, ResolveResponseOptions } from './types.js'

/**
 * This is an example resolver that will read and parse the response body and throw a FetchError if the response is not ok.
 * Assumes all response bodies include a string prop `error` for error messages. You can extend these further in your own code
 * base with additional type assertions
 */
export async function resolveResponse<T, E extends ErrorBody>(res: FetchResponse<T, E>, options: ResolveResponseOptions = {}): Promise<T | null> {
	const text = await res.text() // can only await content once between json() and text(); so we'll do it by hand.
	if (options.resolveWithResponseBody) return text as unknown as T // T is assumed string
	let body: unknown
	try {
		if (text.length > 0) body = JSON.parse(text)
	// eslint-disable-next-line no-empty
	} catch { } // ignoring json parse

	if (res.ok) {
		if (body != null) return body as T
		return null
	}

	if (isErrorBody(body)) throw new FetchError<E>(body.error, res.status, body as E)
	throw new FetchError<E>(`Request failed - ${text}`, res.status, text)
}
