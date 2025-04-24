import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../context/AppContext'
import { deleteBookForever } from '../api'
import { getLastBookId, clearLastBookId } from '../utils/storage'
import BookPreviewModal from '../components/BookPreviewModal'
import MyLibraryGridView from '../views/LibraryGridView'
import MyLibraryListView from '../views/LibraryListView'

const BookGridContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
  height: 100%;
  width: 100%;
  background: var(--gradient-blue-clear);
  flex-direction: column;
`

const ViewSwitch = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem 2rem 0 2rem;
  gap: 1rem;
`

const SwitchButton = styled.button`
  background: ${({ $active }) =>
    $active ? 'var(--color-accent)' : 'transparent'};
  color: white;
  border: 1px solid white;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
`

const MyLibraryView = () => {
  const { state, dispatch } = useContext(AppContext)
  const viewMode = state.libraryViewMode || 'grid'
  const [selectedBook, setSelectedBook] = useState(null)
  const [isManaging, setIsManaging] = useState(false)
  const [selectedBooks, setSelectedBooks] = useState([])

  useEffect(() => {
    const checkFiles = async () => {
      await Promise.all(
        state.library.map(async (book) => {
          try {
            const res = await fetch(book.fileUrl, { method: 'HEAD' })
            if (!res.ok) throw new Error('File not found')
          } catch {
            try {
              await deleteBookForever(book._id)
            } catch (err) {
              console.error('Error while removing from backend:', err)
            }
            dispatch({ type: 'REMOVE_BOOK', payload: book._id })
            if (getLastBookId() === book._id) clearLastBookId()
          }
        })
      )
    }

    if (state.library?.length) checkFiles()
  }, [state.library, dispatch, selectedBooks, isManaging])

  const filteredBooks = state.library?.filter((book) => !book.isDeleted)

  return (
    <BookGridContainer>
      <ViewSwitch>
        <SwitchButton
          $active={isManaging}
          onClick={() => {
            setIsManaging(!isManaging)
            setSelectedBooks([])
          }}
        >
          🛠 Manage
        </SwitchButton>
        <SwitchButton
          $active={viewMode === 'grid'}
          onClick={() =>
            dispatch({ type: 'SET_LIBRARY_VIEW_MODE', payload: 'grid' })
          }
        >
          🟦 Tiles
        </SwitchButton>
        <SwitchButton
          $active={viewMode === 'list'}
          onClick={() =>
            dispatch({ type: 'SET_LIBRARY_VIEW_MODE', payload: 'list' })
          }
        >
          📃 List
        </SwitchButton>
      </ViewSwitch>

      {viewMode === 'grid' ? (
        <MyLibraryGridView books={filteredBooks} />
      ) : (
        <MyLibraryListView books={filteredBooks} onSelect={setSelectedBook} />
      )}

      {selectedBook && (
        <BookPreviewModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </BookGridContainer>
  )
}

export default MyLibraryView
