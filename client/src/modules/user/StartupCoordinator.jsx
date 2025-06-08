/**
 * @file StartupCoordinator.jsx
 * @description
 * React component responsible for coordinating application startup logic.
 * Handles:
 * - Refreshing the access token using the refresh-token
 * - Initializing full book models into RTK Query cache
 * - Handling fallback cases and timing issues
 */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRefreshMutation } from '@/store/api/authApi'
import { booksApi } from '@/store/api/booksApi'
import {
  setCredentials,
  markStartupReady,
  setStartupReady,
} from '@/store/slices/authSlice'
import { useAuth, useCurrentUser } from '@/modules/user/hooks'
import { setAuthModalMode } from '@/store/slices/mainUiSlice'

/**
 * StartupCoordinator component.
 * Coordinates authentication and book loading on app startup.
 *
 * @returns {null}
 */
export default function StartupCoordinator() {
  const dispatch = useDispatch()
  const [refresh] = useRefreshMutation()
  const { isLoggedIn } = useAuth()
  const { user } = useCurrentUser()
  const startupReady = useSelector((state) => state.auth.startupReady)

  // Step 1: Attempt token refresh
  useEffect(() => {
    console.log('[StartupCoordinator] Attempting token refresh...')
    refresh()
      .unwrap()
      .then(({ access }) => {
        console.log('[StartupCoordinator] Token refreshed successfully')
        dispatch(setCredentials({ access }))
      })
      .catch((error) => {
        console.warn('[StartupCoordinator] Refresh failed:', error?.data || error)
      })
  }, [refresh, dispatch])

  // Step 2: Load books after auth is complete
  useEffect(() => {
    if (isLoggedIn && user?._id && !startupReady) {
      console.log('[StartupCoordinator] Starting book preload after auth...')

      dispatch(
        booksApi.endpoints.getBooks.initiate(undefined, {
          forceRefetch: true,
        })
      )
        .then(() => {
          console.log('[StartupCoordinator] Books loaded successfully')
          dispatch(markStartupReady())
        })
        .catch((err) => {
          console.error('[StartupCoordinator] Book loading failed:', err)
          dispatch(setStartupReady(false))
        })
    }
  }, [isLoggedIn, user?._id, startupReady, dispatch])

  // Step 3: Reset startup flag when user logs out
  useEffect(() => {
    if (!isLoggedIn && startupReady) {
      console.log('[StartupCoordinator] User is not logged in — resetting startupReady')
      dispatch(setAuthModalMode(null))
      dispatch(setStartupReady(false))
    }
  }, [isLoggedIn, startupReady, dispatch])

  return null
}
