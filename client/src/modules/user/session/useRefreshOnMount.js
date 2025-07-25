/**
 * @file useRefreshOnMount.js
 * @description
 * Hook that triggers a token refresh on application mount when the user is not logged in.
 * - If no valid access token is present, calls the RTK Query `refresh` mutation.
 * - On success, dispatches setCredentials to store the new token.
 * - Silently ignores failures (user remains logged out).
 */
import { useEffect } from 'react'
import { useRefreshMutation } from '@/store/api/authApi/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials , setAuthChecked} from '@/store/slices/authSlice'
import { selectAccessToken } from '@/store/selectors/authSelectors'
import { getAuth } from '@/utils/storageService'

export default function useRefreshOnMount() {
  const dispatch = useDispatch()
  const [refresh] = useRefreshMutation()
  const accessToken = useSelector(selectAccessToken)

 useEffect(() => {
    if (!accessToken) {
      const stored = getAuth()
      if (!stored?.access) {
        refresh()
          .unwrap()
          .then(({ access, user }) => {
            dispatch(setCredentials({ access, user }))
          })
          .finally(() => {
            dispatch(setAuthChecked(true))
          })
          }
    } else {
      dispatch(setAuthChecked(true))
    }
  }, [accessToken, refresh, dispatch])
}

