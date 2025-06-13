/**
 * @file useAuthCleanupOnLogout.js
 * @description
 * Hook that resets session-related state upon logout:
 * - Clears Auth modal mode
 * - Sets authChecked to true
 * - Resets RTK Query cache for books
 */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { booksApi } from '@/store/api/booksPrivateApi/booksApi'
import {  setAuthChecked } from '@store/slices/authSlice'
import { selectAuthChecked, selectAccessToken } from '@store/api/authApi/authSelectors'
import { setAuthModalMode } from '@/store/slices/mainUiSlice'

export default function useAuthCleanupOnLogout() {
  const dispatch = useDispatch()
  const authChecked = useSelector(selectAuthChecked)
  const accessToken = useSelector(selectAccessToken)

  useEffect(() => {
    if (!accessToken && !authChecked) {
      dispatch(setAuthModalMode(null))
      dispatch(setAuthChecked(true))
      dispatch(booksApi.util.resetApiState())
    }
  }, [accessToken, authChecked, dispatch])
}