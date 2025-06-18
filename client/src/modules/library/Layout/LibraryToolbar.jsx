/**
 * @file LibraryToolbar.jsx
 * @description Toolbar with title, sorting, view toggle and batch actions.
 */

import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { IoGrid, IoList, IoReorderThree, IoTrash } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

import AddBookTile from '@upload/AddBookTile'
import {
  LibraryToolbarButton,
  LibraryToolbarSelect,
} from '@library/components/LibraryToolbarButton'

import { useUpdateBookMutation } from '@/store/api/booksPrivateApi'
import {
  toggleManageMode,
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

/* --------------------------------------------------------------------------- */
/*  COMPONENT: LibraryToolbar                                                  */
/* --------------------------------------------------------------------------- */

const LibraryToolbar = () => {
  const dispatch = useDispatch()
  const [updateBook] = useUpdateBookMutation()

  const isManaging = useSelector(selectIsManageMode)
  const selected   = useSelector(selectSelectedBookIds)
  const viewMode   = useSelector(selectLibraryViewMode)
  const sortMode   = useSelector(selectSortMode)

  const { pathname } = useLocation()

  const section = useMemo(() => {
    if (pathname.includes('/archive'))   return 'Archive'
    if (pathname.includes('/favorites')) return 'Favorites'
    return 'My Books'
  }, [pathname])

  const handleBatchDelete = () => {
    selected.forEach((id) => {
      updateBook({ id, changes: { flags: { isArchived: true } } })
    })
    dispatch(clearSelected())
  }

  return (
    <ToolbarWrapper>
      <SectionTitle>{section}</SectionTitle>

      <ToolbarActions>
        {viewMode === 'list' && !isManaging && (
          <AddBookTile />
        )}

        <LibraryToolbarButton
          onClick={() => dispatch(toggleManageMode())}
          $active={isManaging}
        >
          {isManaging ? 'Done' : 'Manage'}
        </LibraryToolbarButton>

        {isManaging && selected.length > 0 && (
          <LibraryToolbarButton onClick={handleBatchDelete} $danger>
            <IoTrash /> Delete selected
          </LibraryToolbarButton>
        )}

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
      </ToolbarActions>
    </ToolbarWrapper>
  )
}

export default React.memo(LibraryToolbar)
