/**
 * @file LibraryToolbar.jsx
 * @description Toolbar for switching views, sorting books, enabling management mode, and batch actions in library.
 */

import React, { useMemo } from 'react'
import styled from 'styled-components'
import { IoGrid, IoList, IoReorderThree, IoTrash } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useUpdateBookMutation } from '@/store/api/booksApi'

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

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

const ToolbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
`

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`

const IconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$active',
})`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-primary);
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition: opacity 0.2s;
  &:hover { opacity: 0.8; }
`

const ManageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$active',
})`
  padding: 0.4rem 1rem;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? 'var(--color-accent)' : 'transparent')};
  color: white;
  border: 1px solid white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background: var(--color-accent-hover); }
`

const BatchDeleteButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$visible',
})`
  display: ${({ $visible }) => ($visible ? 'inline-flex' : 'none')};
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  background: var(--color-danger);
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background: var(--color-danger-hover); }
`

const Select = styled.select`
  padding: 0.4rem 1rem;
  border-radius: 6px;
  background: var(--background-color);
  color: var(--text-primary);
  font-size: 1rem;
  border: 1px solid var(--border-color);
  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
`

//-----------------------------------------------------------------------------
// Component: LibraryToolbar
//-----------------------------------------------------------------------------

/**
 * Toolbar with view switches, sort menu, and batch actions for books in library mode.
 *
 * @component
 * @returns {JSX.Element}
 */
const LibraryToolbar = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const [updateBook] = useUpdateBookMutation()

  //--- Redux state
  const isManaging = useSelector(selectIsManageMode)
  const selected   = useSelector(selectSelectedBookIds)
  const viewMode   = useSelector(selectLibraryViewMode)
  const sortMode   = useSelector(selectSortMode)

  //--- Determine current section name
  const section = useMemo(() => {
    if (pathname === '/library') return 'My Books'
    if (pathname === '/library/import') return 'Import Books'
    if (pathname === '/library/archive') return 'Archive'
    if (pathname === '/library/favorites') return 'Favorites'
    return ''
  }, [pathname])

  const inLibrary = pathname.startsWith('/library')

  /**
   * Archives all selected books and clears selection
   */
  const handleBatchDelete = () => {
    selected.forEach((id) => {
      updateBook({ id, changes: { flags: { isArchived: true } } })
    })
    dispatch(clearSelected())
  }

  return (
    <ToolbarWrapper>
      <h2>{section}</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {inLibrary && (
          <ManageButton
            onClick={() => dispatch(toggleManageMode())}
            $active={isManaging}
          >
            {isManaging ? 'Done' : 'Manage'}
          </ManageButton>
        )}

        <BatchDeleteButton
          $visible={isManaging && selected.length > 0}
          onClick={handleBatchDelete}
        >
          <IoTrash /> Delete selected
        </BatchDeleteButton>

        {inLibrary && (
          <>
            <Select
              value={sortMode}
              onChange={(e) => dispatch(setSortMode(e.target.value))}
            >
              <option value='title-asc'>Title A–Z</option>
              <option value='title-desc'>Title Z–A</option>
              <option value='author-asc'>Author A–Z</option>
              <option value='author-desc'>Author Z–A</option>
              <option value='date-desc'>Recently added</option>
              <option value='date-asc'>Oldest added</option>
              <option value='updated-desc'>Last edited</option>
              <option value='rating-desc'>Highest rating</option>
              <option value='rating-asc'>Lowest rating</option>
            </Select>

            <ViewToggle>
              <IconButton
                $active={viewMode === 'grid'}
                onClick={() => dispatch(setLibraryViewMode('grid'))}
                title='Grid view'
              >
                <IoGrid />
              </IconButton>
              <IconButton
                $active={viewMode === 'list'}
                onClick={() => dispatch(setLibraryViewMode('list'))}
                title='List view'
              >
                <IoList />
              </IconButton>
              <IconButton
                $active={viewMode === 'table'}
                onClick={() => dispatch(setLibraryViewMode('table'))}
                title='Table view'
              >
                <IoReorderThree />
              </IconButton>
            </ViewToggle>
          </>
        )}
      </div>
    </ToolbarWrapper>
  )
}

export default React.memo(LibraryToolbar)
