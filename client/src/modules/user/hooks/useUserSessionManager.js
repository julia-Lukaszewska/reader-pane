/**
 * @file useUserSessionManager.js
 * @description
 * Hook for managing user session lifecycle.
 * Handles side effects triggered by login and logout events.
 *
 * On login:
 * - Waits for a valid user ID
 * - Triggers initialization of full book objects (meta + flags + stats)
 *
 * On logout:
 * - Resets session-related UI state
 * - Clears internal flags to allow re-init on next login
 */

import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth, useCurrentUser } from './'
import { useInitializeBooks } from '@/hooks'
import { setAuthModalMode } from '@/store/slices/mainUiSlice'

/**
 * Manages actions tied to user login/logout events.
 * This hook should be used once at app root level.
 */
export default function useUserSessionManager() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useAuth()
  const { user } = useCurrentUser()
  const { initialize } = useInitializeBooks()

  const hasInitialized = useRef(false)

  useEffect(() => {
    console.log('[useUserSessionManager] Checking session state:', {
      isLoggedIn,
      userId: user?._id,
    })

    if (isLoggedIn && user?._id && !hasInitialized.current) {
      console.log('[useUserSessionManager] Initializing book data...')
      hasInitialized.current = true
      initialize()
    }
  }, [isLoggedIn, user?._id, initialize])

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('[useUserSessionManager] User logged out — resetting state')
      dispatch(setAuthModalMode(null))
      hasInitialized.current = false
    }
  }, [isLoggedIn, dispatch])
}
