import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLibraryFilter } from '@/store/slices/bookSlice'

/**
 * Hook that sets the library filter on mount.
 *
 * @param {string} filterName - Name of the filter to activate
 */
export default function useLibraryFilter(filterName) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setLibraryFilter(filterName))
  }, [dispatch, filterName])
}