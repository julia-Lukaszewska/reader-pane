//-----------------------------------------------------------------------------
//------ MyLibraryView – displays user's personal book library  
//-----------------------------------------------------------------------------

import { useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import BookTile from '../components/BookTile' // Book display component  
import AddBookTile from '../components/AddBookTile' // Add button tile  
import { AppContext } from '../context/AppContext' // Global app state context  
import { deleteBookForever } from '../api' // Book removal API call  
import { getLastBookId, clearLastBookId } from '../utils/storage' // LocalStorage helpers  

//-----------------------------------------------------------------------------
//------ BookGridContainer – wrapper for full view layout  
//-----------------------------------------------------------------------------

const BookGridContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
  height: 100%;
  width: 100%;
  background: var(--gradient-blue-clear);
`

//-----------------------------------------------------------------------------
//------ BooksGrid – responsive book grid layout  
//-----------------------------------------------------------------------------

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 2rem;
  width: 100%;
  height: 100%;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
`

//-----------------------------------------------------------------------------
//------ MyLibraryView component definition  
//-----------------------------------------------------------------------------

const MyLibraryView = () => {
  const { state, dispatch } = useContext(AppContext)
  const inputRef = useRef(null)

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

            if (getLastBookId() === book._id) {
              clearLastBookId()
            }
          }
        })
      )
    }

    if (state.library?.length) {
      checkFiles()
    }
  }, [state.library, dispatch]) // Run check when library updates  

  return (
    <BookGridContainer>
      <BooksGrid>
        {state.library?.map((book) =>
          !book.isDeleted ? <BookTile key={book._id} book={book} /> : null
        )}
        <AddBookTile inputRef={inputRef} />
      </BooksGrid>
    </BookGridContainer>
  )
}

export default MyLibraryView
