/**
 * @file useAuthBootstrap.js
 * @description Initialization hook for refreshing access token on app startup.
 * Automatically attempts to refresh credentials using stored refresh-token.
 */

//-----------------------------------------------------------------------------
//------ useAuthBootstrap – initialize auth state on app load
//-----------------------------------------------------------------------------

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authApi, useRefreshMutation } from '@/store/api/authApi'
import { setCredentials } from '@/store/slices/authSlice'

//-----------------------------------------------------------------------------
// Hook: useAuthBootstrap
//-----------------------------------------------------------------------------

/**
 * Runs once on app startup to attempt automatic login via refresh-token.
 * Dispatches new credentials if token is valid.
 *
 * @returns {void}
 */
export default function useAuthBootstrap() {
  const dispatch = useDispatch()
  const [refresh] = useRefreshMutation()

  useEffect(() => {
    refresh()
      .unwrap()
      .then(({ access }) => {
        dispatch(setCredentials({ access }))
      })
      .catch(() => {
        // No refresh-token or it has expired – user remains unauthenticated
      })
  }, [refresh, dispatch])
}
