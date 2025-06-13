/**
 * @file useAuthFinalizer.js
 * @description
 * Fallback hook to ensure authChecked becomes true after a timeout,
 * preventing indefinite waiting if no login or refresh occurs.
 */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthChecked } from '@store/slices/authSlice'
import { selectAuthChecked} from  '@store/api/authApi/authSelectors'

export default function useAuthFinalizer() {
  const dispatch = useDispatch()
  const authChecked = useSelector(selectAuthChecked)

  useEffect(() => {
    if (!authChecked) {
      const timer = setTimeout(() => {
        dispatch(setAuthChecked(true))
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [authChecked, dispatch])
}
