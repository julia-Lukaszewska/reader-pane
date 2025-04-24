// -----------------------------------------------------------------------------
//------ IMPORTS  
// -----------------------------------------------------------------------------

import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'
import { useRef, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { uploadBook, getBooks } from '../api'
import { usePDFValidation } from '../hooks/usePDFValidation'
import { usePDFPageCounter } from '../hooks/usePDFPageCounter'

// -----------------------------------------------------------------------------
//------ AddTile styled component  
// -----------------------------------------------------------------------------

const AddTile = styled.div`
  aspect-ratio: 2 / 3;
  width: var(--book-size, 150px);
  background: var(--gradient-main);
  backdrop-filter: blur(6px);
  border-radius: var(--border-radius-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
  font-size: 0.9rem;
  padding: 1rem;

  svg {
    font-size: 3rem;
    stroke-width: 3;
    color: white;
  }

  &:hover {
    transform: translateY(-4px);
    background-color: rgba(58, 138, 195, 0.86);
  }
`  

// -----------------------------------------------------------------------------
//------ HiddenInput styled component  
// -----------------------------------------------------------------------------

const HiddenInput = styled.input`
  display: none;
`  

// -----------------------------------------------------------------------------
//------ AddBookTile component  
// -----------------------------------------------------------------------------

const AddBookTile = () => {
  const inputRef = useRef()
  const { dispatch } = useContext(AppContext)
  const { validate } = usePDFValidation()
  const { countPages } = usePDFPageCounter()

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    console.log('[UPLOAD] File selected:', file)

    if (!validate(file)) {
      console.warn('[UPLOAD] Invalid file selected')
      alert('The selected file is not a valid PDF.')
      return
    }

    try {
      const totalPages = await countPages(file)  
      console.log('[UPLOAD] Total pages:', totalPages)  

      const formData = new FormData()  
      formData.append('file', file)
      formData.append('totalPages', totalPages)

      const uploadedBook = await uploadBook(formData)  
      console.log('[UPLOAD] API response:', uploadedBook)  

      if (uploadedBook?.fileUrl) {
        dispatch({ type: 'ADD_BOOK', payload: uploadedBook })
        const books = await getBooks()
        dispatch({ type: 'SET_LIBRARY', payload: books })
      }
    } catch (err) {
      console.error('[ERROR] Upload failed:', err)
      alert('File upload failed.')
    } finally {
      e.target.value = null
    }
  }

  return (
    <>
      <AddTile onClick={() => inputRef.current?.click()}>
        <FiPlus />
        <span>Add a book</span>
        <small>Upload PDF</small>
      </AddTile>

      <HiddenInput
        type="file"
        accept="application/pdf"
        ref={inputRef}
        onChange={handleFileChange}
      />
    </>
  )
}

export default AddBookTile // Export component  
