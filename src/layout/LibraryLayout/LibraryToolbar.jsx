// File: src/layout/LibraryLayout/LibraryToolbar.jsx
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { IoGrid, IoList, IoReorderThree, IoTrash } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  toggleManaging,
  setSortMode,
  setLibraryViewMode,
  clearSelectedBooks,
} from '@/store'
import { archiveBookThunk } from '@/store'

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
  &:hover {
    opacity: 0.8;
  }
`

const ManageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$active',
})`
  padding: 0.4rem 1rem;
  border-radius: 6px;
  background-color: ${({ $active }) =>
    $active ? 'var(--color-accent)' : 'transparent'};
  color: white;
  border: 1px solid white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--color-accent-hover);
  }
`

const BatchDeleteButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$visible',
})`
  display: ${({ $visible }) => ($visible ? 'inline-flex' : 'none')};
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  background-color: var(--color-danger);
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--color-danger-hover);
  }
`

export const LibraryToolbar = React.memo(() => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const section = useMemo(() => {
    if (pathname === '/library') return 'My Books'
    if (pathname === '/library/import') return 'Import Books'
    if (pathname === '/library/archive') return 'Archive'
    if (pathname === '/library/favorites') return 'Favorites'
    return ''
  }, [pathname])


  const inLibrary = pathname.startsWith('/library')
  const { libraryViewMode, sortMode, isManaging, selectedBooks } = useSelector(
    (s) => s.library
  )

  const selectedCount = selectedBooks.length

  const handleBatchDelete = () => {
  
    selectedBooks.forEach((id) => dispatch(archiveBookThunk(id)))
    dispatch(clearSelectedBooks())
  }

  return (
    <ToolbarWrapper>
      <h2>{section}</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {inLibrary && (
          <ManageButton
            onClick={() => dispatch(toggleManaging())}
            $active={isManaging}
          >
            {isManaging ? 'Zakończ' : 'Zarządzaj'}
          </ManageButton>
        )}

        <BatchDeleteButton
          $visible={isManaging && selectedCount > 0}
          onClick={handleBatchDelete}
        >
          <IoTrash /> Usuń zaznaczone
        </BatchDeleteButton>

        {inLibrary && (
          <select
            value={sortMode}
            onChange={(e) => dispatch(setSortMode(e.target.value))}
            style={{ padding: '0.4rem 1rem', borderRadius: '6px' }}
          >
            <option value="title-asc">A-Z</option>
            <option value="title-desc">Z-A</option>
            <option value="date-desc">Najnowsze</option>
            <option value="date-asc">Najstarsze</option>
          </select>
        )}

        {inLibrary && (
          <ViewToggle>
            <IconButton
              $active={libraryViewMode === 'grid'}
              onClick={() => dispatch(setLibraryViewMode('grid'))}
              title="Widok siatki"
            >
              <IoGrid />
            </IconButton>
            <IconButton
              $active={libraryViewMode === 'list'}
              onClick={() => dispatch(setLibraryViewMode('list'))}
              title="Widok listy"
            >
              <IoList />
            </IconButton>
            <IconButton
              $active={libraryViewMode === 'table'}
              onClick={() => dispatch(setLibraryViewMode('table'))}
              title="Widok tabeli"
            >
              <IoReorderThree />
            </IconButton>
          </ViewToggle>
        )}
      </div>
    </ToolbarWrapper>
  )
})

export default LibraryToolbar
