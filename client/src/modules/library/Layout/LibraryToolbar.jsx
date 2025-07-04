/**
 * @file LibraryToolbar.jsx
 * @description Toolbar with title, sorting, view toggle and batch actions.
 */
import { useLocation } from 'react-router-dom'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { IoGrid, IoList, IoReorderThree, IoChevronBack, IoChevronForward, IoSearch } from 'react-icons/io5'
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

const TopRowWrapper = styled.div`
  width: 100vw;
  display: grid;
  font-size: var(--text-01);

  grid-template-areas: "LT CT RT";
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: var(--padding-03);
  background: var(--library-toolbar-bg-01); /* background for top row */
  backdrop-filter: var(--blur-lg);
  gap: var(--gap-toolbar);
`

const BottomRowWrapper = styled.div`
  width: 100vw;
  display: grid;
  font-size: var(--text-01);
  grid-template-areas: "LB CB RB";
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: var(--padding-02);
  background: var(--button-bg-02); /* background for bottom row */
  backdrop-filter: var(--blur-md);
  gap: var(--gap-toolbar);
  
`

const SectionTitle = styled.h2`
  grid-area: LT;
  
 letter-spacing: var(--letter-spacing-md);
font-size: var(--text-02);
font-weight: var(--weight-01);
  display: flex;
flex-wrap: nowrap;
`

const CenterTop = styled.div`
  grid-area: CT;
  display: flex;
  
flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`

const ManageWrapper = styled.div`
  grid-area: RT;
  display: flex;
 
flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  gap: var(--gap-toolbar);
`

const AddWrapper = styled.div`
  grid-area: RT;
  display: flex;
 
flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`

const SearchWrapper = styled.div`
  grid-area: RT;
  position: relative;
  display: flex;
  
flex-wrap: nowrap;
  align-items: center;
`

const SortWrapper = styled.div`
  grid-area: RT;
  display: flex;
  justify-content: flex-end;
  display: flex;
flex-wrap: nowrap;
  align-items: center;
`

const PageNav = styled.div`
  grid-area: CB;
  
  display: flex;
flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-l);
  font-size: var(--text-01);
`

const PaginationInfo = styled.span`
 display: flex;
flex-wrap: nowrap; 
color: var(--text-color-01);
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

const ViewWrapper = styled.div`
  grid-area: RB;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--gap-toolbar);
`

/* --------------------------------------------------------------------------- */
/*  COMPONENT: LibraryToolbar                                                  */
/* --------------------------------------------------------------------------- */

const LibraryToolbar = () => {
  const dispatch = useDispatch()

  const isManaging = useSelector(selectIsManageMode)
  const selected = useSelector(selectSelectedBookIds)
  const viewMode = useSelector(selectLibraryViewMode)
  const sortMode = useSelector(selectSortMode)
  const visible = useSelector(selectVisibleBooks)
  const visibleIds = visible.map(b => b._id)
  const searchQuery = useSelector(selectSearchQuery)
  const page = useSelector(selectLibraryPage)
  const totalPages = useSelector(selectLibraryTotalPages)
  const totalBooks = useSelector(selectLibraryTotalBooks)
  const pageBooks = useSelector(selectLibraryPageBookCount)

  const { pathname } = useLocation()

  const section = useMemo(() => {
    if (pathname.includes('/archive')) return 'Archive'
    if (pathname.includes('/favorites')) return 'Favorites'
    return 'My Books'
  }, [pathname])

  const inLibrary = true

  return (
    <>
      <TopRowWrapper>
        <SectionTitle>{section}</SectionTitle>

        <CenterTop>
          {/* Example: add filters or badge here */}
        </CenterTop>

        <ManageWrapper>
          {viewMode === 'list' && !isManaging && (
            <AddWrapper>
              <AddBookTile />
            </AddWrapper>
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
            <SortWrapper>
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
            </SortWrapper>
          )}
        </ManageWrapper>
      </TopRowWrapper>

      <BottomRowWrapper>
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
        </PageNav>

        <ViewWrapper>
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
        </ViewWrapper>
      </BottomRowWrapper>
    </>
  )
}

export default React.memo(LibraryToolbar)
