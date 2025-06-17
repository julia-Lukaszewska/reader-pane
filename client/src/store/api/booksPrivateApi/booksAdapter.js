/**
 * @file booksAdapter.js
 * @description
 * Normalizes Book entities using `createEntityAdapter`:
 * - Uses MongoDB’s `_id` field as the entity ID  
 * - Sorts by newest first (`meta.addedAt` descending)
 *
 * Used in:
 * - `booksApiCollection.js` (`transformResponse`)
 * - Selectors built on top of RTK Query
 */
import { createEntityAdapter } from '@reduxjs/toolkit'

//-----------------------------------------------------
//------ Entity Adapter
//-----------------------------------------------------

/**
 * @constant booksAdapter
 * @description Entity adapter for Book objects.
 * @property {Function} selectId      - Chooses `_id` as the ID field
 * @property {Function} sortComparer  - Compares by descending `meta.addedAt`
 */
export const booksAdapter = createEntityAdapter({
  selectId: book => book._id,
  sortComparer: (a, b) =>
    new Date(b.meta?.addedAt ?? 0) - new Date(a.meta?.addedAt ?? 0),
})

//-----------------------------------------------------
//------ Initial State
//-----------------------------------------------------

/**
 * @constant booksInitialState
 * @description Empty normalized state – useful for tests or fallbacks.
 */
export const booksInitialState = booksAdapter.getInitialState()

//-----------------------------------------------------
//------ Selectors Factory
//-----------------------------------------------------

/**
 * @function createBooksSelectors
 * @description
 * Factory to generate RTK Query selectors for Book data.
 * Pass your `select*Result` to get back:
 * `selectAll`, `selectById`, `selectEntities`, `selectIds`, `selectTotal`.
 *
 * @param {Object} queryResult  - RTK Query result object
 * @returns {EntitySelectors}   - Adapter selectors bound to your data
 *
 * @example
 * const { data } = useGetBooksQuery()
 * const booksSelectors = createBooksSelectors({ data })
 * const allBooks = booksSelectors.selectAll()
 */
export const createBooksSelectors = queryResult =>
  booksAdapter.getSelectors(
    () => queryResult?.data ?? booksInitialState
  )
