import { FetchError } from './FetchError.js'

export const isFetchError = <E = unknown>(error: unknown): error is FetchError<E> => error instanceof FetchError
