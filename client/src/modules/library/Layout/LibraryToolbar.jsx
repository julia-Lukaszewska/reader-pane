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
  padding: 0.4em 1.9em;
  background: var(--gradient-main-v2);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
  margin-bottom: 1em;
  gap: 1.5em;
  flex-wrap: nowrap;
  white-space: nowrap;
`

const SectionTitle = styled.h2`
  font-size: 1.3em;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  flex-shrink: 0;
`

const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: nowrap;
`

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5em;
`

const IconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$active',
})`
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: var(--text-primary);
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.8;
  }
`
const PageNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
    font-size: 0.8em;
`

const NavButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1em;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`

const PaginationInfo = styled.span`
  color: var(--text-primary);
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
  color: white;
  opacity: 0.7;
`

const SearchInput = styled(LibraryToolbarInput)`
  padding-left: 2em;
  color: white;
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
              <NavButton onClick={() => dispatch(setLibraryPage(page - 1))} disabled={page <= 1}>
                <IoChevronBack />
              </NavButton>
              <PaginationInfo>
                {page} / {totalPages} 
              </PaginationInfo>
              <NavButton onClick={() => dispatch(setLibraryPage(page + 1))} disabled={page >= totalPages}>
                <IoChevronForward />
              </NavButton>
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
              <IconButton
                $active={viewMode === 'grid'}
                onClick={() => dispatch(setLibraryViewMode('grid'))}
                title="Grid view"
              >
                <IoGrid />
              </IconButton>
              <IconButton
                $active={viewMode === 'list'}
                onClick={() => dispatch(setLibraryViewMode('list'))}
                title="List view"
              >
                <IoList />
              </IconButton>
              <IconButton
                $active={viewMode === 'table'}
                onClick={() => dispatch(setLibraryViewMode('table'))}
                title="Table view"
              >
                <IoReorderThree />
              </IconButton>
            </ViewToggle>
          </>
        )}
      </ToolbarActions>
    </ToolbarWrapper>
  )
}

export default React.memo(LibraryToolbar)