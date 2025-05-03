// File: src/components/books/AddBookTile.jsx
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'
import { useFileUpload } from '@/hooks'
import { useSelector } from 'react-redux'

// -----------------------------------------------------------------------------
//------AddBookTile component – Add book tile with upload functionality 
// -----------------------------------------------------------------------------
const AddTile = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'viewMode',
})`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-primary);
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;


  ${({ viewMode }) =>
    viewMode === 'grid' &&
    `
    background: var(--gradient-main);
    backdrop-filter: blur(6px);
    border-radius: var(--border-radius-sm);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    aspect-ratio: 2 / 3;
    width: var(--book-size, 150px);
    padding: 1rem;
  `}

 
  ${({ viewMode }) =>
    viewMode === 'list' &&
    `
    background: var(--gradient-main);
    backdrop-filter: blur(6px);
    border-radius: var(--border-radius-sm);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 100%;
    height: 8vh;
    padding: 0 1rem;
    margin-bottom: 1rem;
    aspect-ratio: auto;
  `}

 
  ${({ viewMode }) =>
    viewMode === 'table' &&
    `
    background: transparent;
    backdrop-filter: none;
    border-bottom: 1px solid var(--border-color);
    box-shadow: none;
    width: 100%;
    height: 5vh;
    padding: 0;
    aspect-ratio: auto;

    svg {
      font-size: 1.4rem;
    }
  `}

  &:hover {
    transform: translateY(-2px);
    background-color: ${({ viewMode }) =>
      viewMode === 'table'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(255, 255, 255, 0.1)'};
  }
`

const HiddenInput = styled.input`
  display: none;
`

const AddBookTile = () => {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const viewMode = useSelector((state) => state.library.libraryViewMode)
  const { upload } = useFileUpload()

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      await upload(file)
    } catch (err) {
      console.error('Upload error:', err)
   
    } finally {
      setUploading(false)
      e.target.value = null
    }
  }

  return (
    <>
      <AddTile viewMode={viewMode} onClick={handleClick}>
        {!uploading ? <FiPlus size={24} /> : <span>Ładowanie...</span>}
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

export default React.memo(AddBookTile)
