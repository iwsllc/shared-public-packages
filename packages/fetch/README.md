# @iwsio/fetch

[![@iwsio/fetch: Push to main](https://github.com/iwsllc/iwsio-packages/actions/workflows/fetch-push-main.yaml/badge.svg)](https://github.com/iwsllc/iwsio-packages/actions/workflows/fetch-push-main.yaml)

This package is meant to simplify fetching typed values from an API using the [built-in `fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```tsx
import { setupFetch } from '@iwsio/fetch'

// example error response body
interface DefaultErrorBody {
	message: string
	stack?: string
}

// example body
interface User {
	name: string,
	email: string,
	phone: string,
	created: string // ISO, etc
}

interface UserListResponse {
	size: number,
	pageIx: number,
	data: User[],
	total: number
}

const utils = setupFetch<DefaultErrorBody>('http://localhost:3000')
export const { getMany, getOne, post, patch } = utils


// Elsewhere...

// append id
try {
	const user = await getOne<User>('/users', id)

// OR by hand
const user2 = await get<User>('/users/123')

// Simple get many; assume response is simple array of type
const users = await getMany<User>('/users')

// More complex get many... response might be paged, with meta info
const listResponse = await get<UserListResponse>('/users?page=2&size=20')
} catch(err: unknown) {
	if (isFetchError(err)) {
		// ...; work with err.body; and `isErrorBody` type assertion
	}
}

```
