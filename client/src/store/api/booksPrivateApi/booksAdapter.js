/**
 * @file booksAdapter.js
 * @description
 * Normalizes *Book* entities using `createEntityAdapter`
 * - **selectId**uses MongoDB’s `_id` field  
 * - **sortComparer*
 * sorts by newest first (`meta.addedAt` descending)
 * This adapter is used in:
 * - `booksApiCollection.js` (`transformResponse`)
 * - all selectors built on top of RTK Query
 */

import { createEntityAdapter } from '@reduxjs/toolkit'

/* --------------------------------------------------------------------------- */
/*  ADAPTER                                                                    */
/* --------------------------------------------------------------------------- */

export const booksAdapter = createEntityAdapter({
  selectId:(book) => book._id,
  sortComparer: (a, b) =>
    new Date(b.meta?.addedAt ?? 0) - new Date(a.meta?.addedAt ?? 0),
})

/* --------------------------------------------------------------------------- */
/*  INITIAL STATE & SELECTORS FACTORY                                          */
/* --------------------------------------------------------------------------- */

/** Empty normalized state – useful for tests or fallbacks */
export const booksInitialState = booksAdapter.getInitialState()

/**
 * RTK Query selectors factory.
 * Pass in the query result (`select*Result`) to get back:
 * `selectAll | selectById | selectEntities | selectIds | selectTotal`.
 *
 * ```js
 * // Example in a component:
 * const { data: booksData } = useGetBooksQuery()
 * const booksSelectors = createBooksSelectors({ data: booksData })
 * const allBooks = booksSelectors.selectAll()
 * ```
 */
export const createBooksSelectors = (queryResult) =>
  booksAdapter.getSelectors(
    () => queryResult?.data ?? booksInitialState,
  )
