/**
 * @file StartupCoordinator.jsx
 * @description
 * React component responsible for coordinating application startup logic.
 * Handles:
 * - Refreshing the access token using the refresh-token
 * - Initializing full book models into RTK Query cache
 * - Handling fallback cases and timing issues
 */

import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useRefreshMutation } from '@/store/api/authApi'
import { booksApi } from '@/store/api/booksApi'
import { setCredentials } from '@/store/slices/authSlice'
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

  const hasInitialized = useRef(false)

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

  // Step 2: Load books after token is valid and user is ready
  useEffect(() => {
    if (isLoggedIn && user?._id && !hasInitialized.current) {
      console.log('[StartupCoordinator] Starting book preload after auth...')

      hasInitialized.current = true

      // Optional delay to ensure token propagation
      setTimeout(() => {
        dispatch(
          booksApi.endpoints.getBooks.initiate(undefined, {
            forceRefetch: true,
          })
        )
          .then(() => {
            console.log('[StartupCoordinator] Books loaded successfully')
          })
          .catch((err) => {
            console.error('[StartupCoordinator] Book loading failed:', err)
          })
      }, 200) // 200ms delay
    }
  }, [isLoggedIn, user?._id, dispatch])

  // Step 3: Cleanup when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      console.log('[StartupCoordinator] User is not logged in — resetting flags')
      dispatch(setAuthModalMode(null))
      hasInitialized.current = false
    }
  }, [isLoggedIn, dispatch])

  return null
}
