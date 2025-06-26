/**
 * @file useAuthFromStorage.js
 * @description Hook that loads authentication data from localStorage
 * on mount. If an access token is found and not already present in
 * Redux state, dispatches setCredentials to restore the session.
 */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccessToken } from '@/store/selectors/authSelectors'
import { setCredentials, setAuthChecked } from '@/store/slices/authSlice'
import { getAuth } from '@/utils/storageService'

export default function useAuthFromStorage() {
  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)

  useEffect(() => {
    if (!accessToken) {
      const data = getAuth()
      if (data?.access) {
        dispatch(setCredentials({ access: data.access, user: data.user  }))
      }
    
    }
  }, [accessToken, dispatch])
}