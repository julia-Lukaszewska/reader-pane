/**
 * @file useInitializeBooks.js
 * @description Hook that preloads static book metadata on app start.
 */

import { useDispatch } from 'react-redux'
import { booksApi } from '@/store/api/booksApi'

export default function useInitializeBooks() {
  const dispatch = useDispatch()

const initialize = () => {
   dispatch(
     booksApi.endpoints.getBooks.initiate(undefined, { forceRefetch: true })
   )
  }

  return { initialize }
}
