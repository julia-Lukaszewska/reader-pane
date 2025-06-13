/**
 * @file LibraryController.jsx
 * @description
 * Orchestrates all non-UI logic for the Library section.
 * - fetches / caches the user's books (RTK Query)
 * - exposes a prefetch helper for single-book hover / preview
 * - resets library-specific UI state on unmount (e.g. selection)
 *
 * ⚠️  UI components must **not** import RTK Query directly – use this controller.
 */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* -----------------------------  RTK Query  -------------------------------- */

import {
  useGetBooksQuery,                     // GET /books/private  →  { ids, entities }
} from '@/store/api/booksPrivateApi'
import { booksApi } from '@/store/api/booksPrivateApi/booksApi' // for usePrefetch

/* ---------------------------  Redux selectors  --------------------------- */

import { selectIsLoggedIn } from '@/store/selectors/authSelectors'
import {
  clearSelected,                        // reset selection on unmount / logout
} from '@/store/slices/bookSlice'

/* ------------------------------------------------------------------------- */
/*  COMPONENT                                                                */
/* ------------------------------------------------------------------------- */

export default function LibraryController() {
  const dispatch     = useDispatch()
  const isLoggedIn   = useSelector(selectIsLoggedIn)

  /* --- 1) Main query – fetch all books when user is logged in ------------ */
  const {
    data: books,    // normalized { ids, entities }  – may be undefined while loading
    isFetching,
    isError,
    error,
  } = useGetBooksQuery(undefined, {
    skip: !isLoggedIn,                   // don’t fire when logged out
    refetchOnMountOrArgChange: true,     // always fresh after route enter
  })

  /* --- 2) Prefetch helper for Book hover / preview ----------------------- */
  const prefetchBookById = booksApi.usePrefetch('getBookById')

  /* --- 3) Log fetch errors (optional: Sentry) ---------------------------- */
  useEffect(() => {
    if (isError) console.error('[LIBRARY] Fetch error:', error)
  }, [isError, error])

  /* --- 4) Cleanup on unmount – clear selection & cancel queries ---------- */
  useEffect(() => {
    return () => {
      dispatch(clearSelected())
      booksApi.util.resetApiState()      // ensure fresh cache next mount
    }
  }, [dispatch])

  /* --- 5) Expose helpers on window for quick debugging (optional) -------- */
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    Object.assign(window, { prefetchBookById, books })
  }

  /* --------------------------------------------------------------------- */
  return null                            // invisible controller
}
