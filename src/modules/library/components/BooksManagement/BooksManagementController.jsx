import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { LoadingSpinner } from '@/components'
import {
  LibraryGridLayout,
  LibraryListLayout,
  LibraryTableLayout,
} from '@library'
import { LibraryToolbar } from '@/modules/library/Layout'
import { BooksManagementToolbar } from '@/modules/library'
import {
  toggleManageMode,
  setManageMode,
  clearSelected,
  setLibraryViewMode,
  setSortMode,
} from '@/store/slices/bookSlice'
import {
  selectIsManageMode,
  selectSelectedBookIds,
  selectLibraryViewMode,
  selectSortMode,
} from '@/store/selectors'

const BooksManagementController = () => {
  const dispatch = useDispatch()

  // Reset management mode on component mount
  useEffect(() => {
    dispatch(setManageMode(false))
  }, [dispatch])

  const viewMode = useSelector(selectLibraryViewMode)
  const sortMode = useSelector(selectSortMode)
  const isManaging  = useSelector(selectIsManageMode)
  const selectedIds = useSelector(selectSelectedBookIds)
  const loading = useSelector((state) => state.library.status === 'loading')

  const handleToggleManaging = () => dispatch(toggleManageMode())
  const handleClearSelected  = () => dispatch(clearSelected())
  const changeViewMode       = (mode) => dispatch(setLibraryViewMode(mode))
  const changeSortMode       = (mode) => dispatch(setSortMode(mode))

  let Content
  if (loading) {
    Content = <LoadingSpinner />
  } else {
    switch (viewMode) {
      case 'grid':
        Content = <LibraryGridLayout sortMode={sortMode} />
        break
      case 'list':
        Content = <LibraryListLayout sortMode={sortMode} />
        break
      case 'table':
        Content = <LibraryTableLayout sortMode={sortMode} />
        break
      default:
        Content = null
    }
  }

  return (
    <>
      <LibraryToolbar
        viewMode={viewMode}
        setViewMode={changeViewMode}
        sortMode={sortMode}
        setSortMode={changeSortMode}
        isManaging={isManaging}
        toggleManaging={handleToggleManaging}
      />

      {isManaging && selectedIds.length > 0 && (
        <BooksManagementToolbar
          selectedBooks={selectedIds}
          onDeleteSelected={handleClearSelected}
        />
      )}

      {Content}
    </>
  )
}

export default BooksManagementController
