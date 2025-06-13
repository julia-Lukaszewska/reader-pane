/**
 * @file AuthController.jsx
 * @description
 * Component that orchestrates authentication lifecycle:
 * - refresh on mount
 * - preload books after login
 * - cleanup on logout
 * - finalizes auth check
 */

import useRefreshOnMount from '@user/session/useRefreshOnMount'
import useBooksPreloadAfterLogin from '@user/session/useBooksPreloadAfterLogin'
import useAuthCleanupOnLogout from '@user/session/useAuthCleanupOnLogout'
import useAuthFinalizer from '@user/session/useAuthFinalizer'

export default function AuthController() {
  useRefreshOnMount()
  useBooksPreloadAfterLogin()
  useAuthCleanupOnLogout()
  useAuthFinalizer()
  return null
}