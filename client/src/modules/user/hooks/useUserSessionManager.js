/**
 * @file useUserSessionManager.js
 * @description Hook for managing user session side effects such as login and logout events.
 */

//-----------------------------------------------------------------------------
//------ useUserSessionManager – Handles effects after login/logout  
//-----------------------------------------------------------------------------

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth, useCurrentUser } from './'
import { useInitializeBooks } from '@/hooks'
import { setAuthModalMode } from '@/store/slices/mainUiSlice'

//-----------------------------------------------------------------------------
// Hook: useUserSessionManager
//-----------------------------------------------------------------------------

/**
 * Custom hook to handle user session changes.
 * Triggers actions after login and logout events.
 *
 * - On login: initializes user's books
 * - On logout: resets UI-related state (e.g. modal mode)
 *
 * @returns {void}
 */
export default function useUserSessionManager() {
  const dispatch = useDispatch()
  const { accessToken, isLoggedIn } = useAuth()
  const { user } = useCurrentUser()
  const { initialize } = useInitializeBooks()

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      initialize()
    }
  }, [isLoggedIn, user?.id, initialize])

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(setAuthModalMode(null))
    }
  }, [isLoggedIn, dispatch])
}
