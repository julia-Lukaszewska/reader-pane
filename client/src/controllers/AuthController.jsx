/**
 * @file AuthController.jsx
 * @description
 * Orchestrates authentication lifecycle:
 * - Refreshes auth on mount
 * - Preloads books after login
 * - Cleans up on logout
 * - Finalizes auth check
 */
import useAuthFromStorage from '@user/session/useAuthFromStorage'
import useRefreshOnMount from '@user/session/useRefreshOnMount'
import useBooksPreloadAfterLogin from '@user/session/useBooksPreloadAfterLogin'
import useAuthCleanupOnLogout from '@user/session/useAuthCleanupOnLogout'
import useAuthFinalizer from '@user/session/useAuthFinalizer'
//-----------------------------------------------------
//------ AuthController Component
//-----------------------------------------------------
/**
 * @component AuthController
 * @description Invisible controller handling authentication side effects.
 * @returns {null}
 */
export default function AuthController() {
  useAuthFromStorage()
  useRefreshOnMount()
  useBooksPreloadAfterLogin()
  useAuthCleanupOnLogout()
  useAuthFinalizer()
  return null
}
