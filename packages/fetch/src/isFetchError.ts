import { FetchError } from './FetchError.js'
import { ErrorBody } from './types.js'

export const isFetchError = <E extends ErrorBody>(error: unknown): error is FetchError<E> => error instanceof FetchError
