/**
 * @file AuthController.jsx
 * @description
 * Component that orchestrates authentication lifecycle:
 * - refresh on mount
 * - preload books after login
 * - cleanup on logout
 * - finalizes auth check
 */

import useRefreshOnMount from './useRefreshOnMount'
import useBooksPreloadAfterLogin from './useBooksPreloadAfterLogin'
import useAuthCleanupOnLogout from './useAuthCleanupOnLogout'
import useAuthFinalizer from './useAuthFinalizer'

export default function AuthController() {
  useRefreshOnMount()
  useBooksPreloadAfterLogin()
  useAuthCleanupOnLogout()
  useAuthFinalizer()
  return null
}