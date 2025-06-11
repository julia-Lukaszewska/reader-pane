/**
 * @file BooksManagementController.jsx
 * @description Main container for managing books in the library view – handles view modes, sorting, bulk actions, and data fetching.
 */

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetBooksQuery } from '@/store/api/booksPrivateApi/booksApiCollection'

import { LoadingSpinner } from '@/components'
import {
  LibraryGridLayout,
  LibraryListLayout,
  LibraryTableLayout,
} from '@library/'
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

//-----------------------------------------------------------------------------
// Component: BooksManagementController
//----------------------------------------------------------------------------- 

/**
 * Controls the library interface: fetches books via RTK Query, handles view switching,
 * sorting, bulk selection, and renders the appropriate layout.
 *
 * @component
 * @returns {JSX.Element}
 */
const BooksManagementController = () => {
  const dispatch = useDispatch()

  //--- Reset management mode when entering library
  useEffect(() => {
    dispatch(setManageMode(false))
  }, [dispatch])

  //--- Fetch books via RTK Query
 const {
   data: booksRaw,
   isLoading,
   isError,
 } = useGetBooksQuery()

 const books = Array.isArray(booksRaw) ? booksRaw : []

  //--- Selectors
  const viewMode    = useSelector(selectLibraryViewMode)
  const sortMode    = useSelector(selectSortMode)
  const isManaging  = useSelector(selectIsManageMode)
  const selectedIds = useSelector(selectSelectedBookIds)

  //--- Actions
  const handleToggleManaging = () => dispatch(toggleManageMode())
  const handleClearSelected  = () => dispatch(clearSelected())
  const changeViewMode       = (mode) => dispatch(setLibraryViewMode(mode))
  const changeSortMode       = (mode) => dispatch(setSortMode(mode))

  //--- Determine content layout
  let Content
  if (isLoading) {
    Content = <LoadingSpinner />
  } else if (isError) {
    Content = <p>Wystąpił błąd podczas ładowania książek.</p>
  } else {
    switch (viewMode) {
      case 'grid':
        Content = <LibraryGridLayout books={books} sortMode={sortMode} />
        break
      case 'list':
        Content = <LibraryListLayout books={books} sortMode={sortMode} />
        break
      case 'table':
        Content = <LibraryTableLayout books={books} sortMode={sortMode} />
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
