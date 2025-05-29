/**
 * @file AddBookTile.jsx
 * @description Tile component for uploading a new PDF book, styled per current library view mode.
 */

import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { selectLibraryViewMode } from '@/store/selectors/selectors'
import { useUploadPDF } from '@/modules/uploadPDF'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

//--- Tile wrapper (changes style depending on current view mode)
const AddTile = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'viewMode',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  color: var(--text-primary);

  //------ Grid view styling

  ${({ viewMode }) =>
    viewMode === 'grid' &&
    `
    width: var(--tile-size);
    aspect-ratio: 2 / 3;
    background: var(--gradient-main);
    backdrop-filter: blur(6px);
    border-radius: var(--border-radius);
    box-shadow: var(--glass-shadow);
    padding: 0.5rem;
  `}

  //------ List view styling

  ${({ viewMode }) =>
    viewMode === 'list' &&
    `
    grid-column: 1 / -1;
    width: 100%;
    height: 90%;
    background: var(--gradient-main);
    backdrop-filter: blur(6px);
    border-radius: var(--border-radius);
    box-shadow: var(--glass-shadow);
  `}

  //------ Table view styling

  ${({ viewMode }) =>
    viewMode === 'table' &&
    `
    width: 100%;
    height: 5vh;
    background: transparent;
    border-bottom: 1px solid var(--border-color);
  `}

  //------ Hover effect
  
  &:hover {
    transform: translateY(-2px);
    background-color: ${({ viewMode }) =>
      viewMode === 'table'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(255, 255, 255, 0.1)'};
  }
`

//--- Hidden input for file selection
const HiddenInput = styled.input`
  display: none;
`

//-----------------------------------------------------------------------------
// Component: AddBookTile
//-----------------------------------------------------------------------------

/**
 * @function AddBookTile
 * @description Renders an interactive tile that allows users to upload a PDF file.
 * When clicked, opens the file picker. Displays a spinner while uploading.
 *
 * @returns {JSX.Element}
 */
const AddBookTile = () => {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const viewMode = useSelector(selectLibraryViewMode)
  const { handleUpload } = useUploadPDF()

  /**
   * Triggers the hidden file input
   */
  const handleClick = () => {
    inputRef.current?.click()
  }

  /**
   * Handles file selection and upload process
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - File input change event
   */
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    await handleUpload(file)
    setUploading(false)

    e.target.value = null
  }

  return (
    <>
      <AddTile viewMode={viewMode} onClick={handleClick}>
        {!uploading ? <FiPlus size={32} /> : <span>Uploading...</span>}
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

export default AddBookTile
