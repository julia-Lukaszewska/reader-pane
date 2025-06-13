/**
 * @file useBooksPreloadAfterLogin.js
 * @description
 * Hook that preloads book data after successful login.
 * - Waits for the user to be logged in and for authChecked flag to be false.
 * - Initiates RTK Query getBooks endpoint with forceRefetch.
 * - Dispatches setAuthChecked(true) after the request completes (success or failure).
 */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { booksApi } from '@/store/api/booksPrivateApi/booksApi'
import { useGetMeQuery } from '@/store/api/authApi/authApi'
import { setAuthChecked } from '@store/slices/authSlice'
import { selectAuthChecked, selectAccessToken } from '@store/api/authApi/authSelectors'

export default function useBooksPreloadAfterLogin() {
  const dispatch = useDispatch()
  const authChecked = useSelector(selectAuthChecked)
  const accessToken = useSelector(selectAccessToken)


  const { data } = useGetMeQuery(undefined, { skip: !accessToken })
  const userId = data?._id || data?.user?._id || data?.data?._id

  useEffect(() => {
    if (accessToken && userId && !authChecked) {
      const result = dispatch(
        booksApi.endpoints.getBooks.initiate(undefined, { forceRefetch: true })
      )
      
      result.unwrap().finally(() => {
        dispatch(setAuthChecked(true))
      })
      return () => {
        result.unsubscribe?.()
      }
    }
  }, [accessToken, userId, authChecked, dispatch])
}
