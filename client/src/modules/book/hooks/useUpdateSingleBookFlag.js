// @file: hooks/useUpdateSingleBookFlag.js

import { useDispatch } from 'react-redux'
import { useUpdateBookFlagsMutation } from '@/store/api/booksPrivateApi'
import { updateFlagField } from '@/store/slices/bookModalSlice'

/**
 * Hook for updating a single book flag (`isFavorited` or `isArchived`).
 * Updates local slice state and sends mutation to backend.
 *
 * @param {string} bookId - Book ID
 * @param {"isFavorited" | "isArchived"} flagName - Name of the flag to manage
 * @returns {(value: boolean) => void} - Setter for the chosen flag
 */
export default function useUpdateSingleBookFlag(bookId, flagName) {
  const dispatch = useDispatch()
  const [updateFlags] = useUpdateBookFlagsMutation()

  const updateFlag = (value) => {
    if (!bookId || !flagName) return
    dispatch(updateFlagField({ name: flagName, value }))
    updateFlags({ id: bookId, flags: { [flagName]: value } })
  }

  return updateFlag
}
