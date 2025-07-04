/**
 * @file LibraryToolbar.jsx
 * @description Toolbar with title, sorting, view toggle and batch actions.
 */
import { useLocation } from 'react-router-dom'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { IoGrid, IoList, IoReorderThree, IoTrash, IoChevronBack, IoChevronForward , IoSearch } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

import AddBookTile from '@upload/AddBookTile'
import {
  LibraryToolbarButton,
  LibraryToolbarSelect,
  LibraryIconButton,
  LibraryToolbarInput,
} from '@library/components/LibraryToolbarButton'

import {
  toggleManageMode,
  clearSelected,
  setSelectedIds,
  setLibraryPage,
  setLibraryViewMode,
  setSearchQuery,
  setSortMode,
} from '@/store/slices/bookSlice'

import {
  selectIsManageMode,
  selectSelectedBookIds,
  selectLibraryViewMode,
  selectSortMode,
  selectSearchQuery,
  selectVisibleBooks,
  selectLibraryPage,
  selectLibraryTotalPages,
  selectLibraryTotalBooks,
  selectLibraryPageBookCount,
} from '@/store/selectors'


/* --------------------------------------------------------------------------- */
/*  STYLED COMPONENTS                                                          */
/* --------------------------------------------------------------------------- */

const ToolbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:var(--padding-03);
    font-weight:var(--weight-01);
  font-size: var(--text-01);
  background: var(--library-toolbar-bg-01);
  backdrop-filter: var(--blur-lg);
  margin-bottom: var(--space-xs);
  gap: var(--gap-toolbar);
  flex-wrap: nowrap;
  white-space: nowrap;
`

const SectionTitle = styled.h2`
  

  
  overflow: hidden;
  text-overflow: ellipsis;
 
  flex-shrink: 0;
`

const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  
  flex-wrap: nowrap;
`

const ViewToggle = styled.div`
  display: flex;
  
`


const PageNav = styled.div`
  display: flex;
  align-items: center;
 
    
`


const PaginationInfo = styled.span`
  color: var(--text-color-01);
`
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const SearchIcon = styled(IoSearch)`
  position: absolute;
  left: 0.6em;
  top: 50%;
  z-index: 2000;
  transform: translateY(-50%);
  pointer-events: none;
  
  opacity: 0.7;
`

const SearchInput = styled(LibraryToolbarInput)`
  padding-left: 2em;
 
`


/* --------------------------------------------------------------------------- */
/*  COMPONENT: LibraryToolbar                                                  */
/* --------------------------------------------------------------------------- */

const LibraryToolbar = () => {
  const dispatch = useDispatch()


  const isManaging = useSelector(selectIsManageMode)
  const selected   = useSelector(selectSelectedBookIds)
  const viewMode   = useSelector(selectLibraryViewMode)
  const sortMode   = useSelector(selectSortMode)
  const visible    = useSelector(selectVisibleBooks)
  const visibleIds = visible.map(b => b._id)
const searchQuery = useSelector(selectSearchQuery)
  const page       = useSelector(selectLibraryPage)
  const totalPages = useSelector(selectLibraryTotalPages)
  const totalBooks = useSelector(selectLibraryTotalBooks)
  const pageBooks  = useSelector(selectLibraryPageBookCount)



const { pathname } = useLocation()

const section = useMemo(() => {
  if (pathname.includes('/archive'))    return 'Archive'
  if (pathname.includes('/favorites'))  return 'Favorites'
  return 'My Books'
}, [pathname])

  const inLibrary = true



  return (
    <ToolbarWrapper>
      <SectionTitle>{section}

      </SectionTitle>

                       <PageNav>
             <LibraryIconButton onClick={() => dispatch(setLibraryPage(page - 1))} disabled={page <= 1}>
                <IoChevronBack />
              </LibraryIconButton>
              <PaginationInfo>
                {page} / {totalPages} 
              </PaginationInfo>
             <LibraryIconButton onClick={() => dispatch(setLibraryPage(page + 1))} disabled={page >= totalPages}>
                <IoChevronForward />
              </LibraryIconButton>
                {pageBooks} of {totalBooks} books
            </PageNav>
      <ToolbarActions>
        {viewMode === 'list' && !isManaging && (
          <AddBookTile />
        )}

        {inLibrary && (
          <LibraryToolbarButton
          onClick={() => dispatch(toggleManageMode())}
          $active={isManaging}
          >
            {isManaging ? 'Done' : 'Manage'}
          </LibraryToolbarButton>
        )}
    
          <SearchWrapper>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </SearchWrapper>

        {inLibrary && (
          <>
            <LibraryToolbarSelect
              value={sortMode}
              onChange={(e) => dispatch(setSortMode(e.target.value))}
              >
              <option value="title-asc">Title A–Z</option>
              <option value="title-desc">Title Z–A</option>
              <option value="author-asc">Author A–Z</option>
              <option value="author-desc">Author Z–A</option>
              <option value="date-desc">Recently added</option>
              <option value="date-asc">Oldest added</option>
              <option value="updated-desc">Last edited</option>
              <option value="rating-desc">Highest rating</option>
              <option value="rating-asc">Lowest rating</option>
            </LibraryToolbarSelect>

            <ViewToggle>
              <LibraryIconButton
                $active={viewMode === 'grid'}
                onClick={() => dispatch(setLibraryViewMode('grid'))}
                title="Grid view"
              >
                <IoGrid />
               </LibraryIconButton>
              <LibraryIconButton
                $active={viewMode === 'list'}
                onClick={() => dispatch(setLibraryViewMode('list'))}
                title="List view"
              >
                <IoList />
              </LibraryIconButton>
              <LibraryIconButton
                $active={viewMode === 'table'}
                onClick={() => dispatch(setLibraryViewMode('table'))}
                title="Table view"
              >
                <IoReorderThree />
              </LibraryIconButton>
            </ViewToggle>
          </>
        )}
      </ToolbarActions>
    </ToolbarWrapper>
  )
}

export default React.memo(LibraryToolbar)