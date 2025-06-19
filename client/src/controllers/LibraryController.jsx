/**
 * @file LibraryController.jsx
 * @description
 * Orchestrates all non-UI logic for the Library section:
 * - Fetches & caches the user’s books via RTK Query
 * - Exposes a prefetch helper for single-book hover/preview
 * - Resets library-specific UI state on unmount (e.g. selection)
 *
 * UI components must **not** import RTK Query directly – use this controller.
 */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//-----------------------------------------------------
//------ RTK Query Hooks
//-----------------------------------------------------
import { useGetBooksQuery } from '@/store/api/booksPrivateApi'
import { booksApi }          from '@/store/api/booksPrivateApi/booksApi'

//-----------------------------------------------------
//------ Redux Selectors & Actions
//-----------------------------------------------------
import { selectIsLoggedIn } from '@/store/selectors/authSelectors'
import { clearSelected }    from '@/store/slices/bookSlice'

//-----------------------------------------------------
//------ LibraryController Component
//-----------------------------------------------------
/**
 * @component LibraryController
 * @description Invisible controller handling all data logic for the Library view.
 * @returns {null}
 */
export default function LibraryController() {
  const dispatch   = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  //-----------------------------------------------------
  //------ Main query: fetch all books when logged in
  //-----------------------------------------------------
  const { data: books, isError, error } = useGetBooksQuery(undefined, {
    skip: !isLoggedIn,
    refetchOnMountOrArgChange: false,
  })

  //-----------------------------------------------------
  //------ Prefetch helper for Book hover/preview
  //-----------------------------------------------------
  const prefetchBookById = booksApi.usePrefetch('getBookById')

  //-----------------------------------------------------
  //------ Log fetch errors (optional: Sentry)
  //-----------------------------------------------------
  useEffect(() => {
    if (isError) console.error('[LIBRARY] Fetch error:', error)
  }, [isError, error])

  //-----------------------------------------------------
  //------ Cleanup on unmount: clear selection & reset cache
  //-----------------------------------------------------
  useEffect(() => {
    return () => {
      dispatch(clearSelected())
     
    }
  }, [dispatch])

  //-----------------------------------------------------
  //------ Dev helpers on window (optional)
  //-----------------------------------------------------
  if (process.env.NODE_ENV === 'development') {
    Object.assign(window, { prefetchBookById, books })
  }

  return null
}
