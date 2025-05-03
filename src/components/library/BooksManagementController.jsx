// File: src/components/BooksManagementController.jsx
//-----------------------------------------------------------------------------
// BooksManagementController – wrapper for book management UI: toolbar, batch actions, and views 
//-----------------------------------------------------------------------------

import { useDispatch, useSelector } from 'react-redux' 
import { setLibraryViewMode, setSortMode } from '@/store' 
import { BooksManagementToolbar, LoadingSpinner } from '@/components' 
import {
  MyLibraryGridView,
  MyLibraryListView,
  MyLibraryTableView,
} from '@/views' 
import { useBookManagement } from '@/hooks' 
import { LibraryToolbar } from '@/layout' 

const BooksManagementController = () => {
  const dispatch = useDispatch()

  // global state
  const viewMode = useSelector((state) => state.library.libraryViewMode)
  const sortMode = useSelector((state) => state.library.sortMode)
  const isManaging = useSelector((state) => state.library.isManaging)
  const selectedBooks = useSelector((state) => state.library.selectedBooks)
  const loading = useSelector((state) => state.library.status === 'loading')

  // selection hook
  const { toggleManaging, clearSelectedBooks } = useBookManagement()

  // handlers
  const handleViewModeChange = (mode) => dispatch(setLibraryViewMode(mode))
  const handleSortModeChange = (mode) => dispatch(setSortMode(mode))
  const handleDeleteSelected = () => {
   
    clearSelectedBooks()
  }

  // choose content based on viewMode
  let ContentComponent
  if (loading) {
    ContentComponent = <LoadingSpinner />
  } else {
    switch (viewMode) {
      case 'grid':
        ContentComponent = <MyLibraryGridView />
        break
      case 'list':
        ContentComponent = <MyLibraryListView />
        break
      case 'table':
        ContentComponent = <MyLibraryTableView />
        break
      default:
        ContentComponent = null
    }
  }

  return (
    <>
      <LibraryToolbar
        viewMode={viewMode}
        setViewMode={handleViewModeChange}
        sortMode={sortMode}
        setSortMode={handleSortModeChange}
        isManaging={isManaging}
        toggleManaging={toggleManaging}
      />

      {isManaging && selectedBooks.length > 0 && (
        <BooksManagementToolbar
          selectedBooks={selectedBooks}
          onDeleteSelected={handleDeleteSelected}
        />
      )}

      {ContentComponent}
    </>
  )
}

export default BooksManagementController 
