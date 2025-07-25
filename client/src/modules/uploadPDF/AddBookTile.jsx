/**
 * @file AddBookTile.jsx
 * @description Tile component for uploading a new PDF book, styled per current library view mode.
 */

import React, { useRef } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { selectLibraryViewMode } from '@/store/selectors'
import { useUploadPDF } from '@/modules/uploadPDF'
import { LibraryToolbarButton } from '@library/components/LibraryToolbarButton'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

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

  ${({ viewMode }) =>
    viewMode === 'grid' &&
    `
    width: var(--tile-size);
    aspect-ratio: 2 / 3;
    background: var(--bookCard-bg-inactive);
    backdrop-filter: blur(6px);
    border-radius: var(--border-radius-md);
    box-shadow: var(--glass-shadow);
    padding: 0.5rem;
  `}

  ${({ viewMode }) =>
    viewMode === 'table' &&
    `
    width: 100%;
    height: 5vh;
    background: transparent;
    border-bottom: 1px solid var(--border-color);
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

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

const AddBookTile = () => {
  const inputRef = useRef(null)
  const viewMode = useSelector(selectLibraryViewMode)
  const { handleUpload, uploading } = useUploadPDF()

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const result = await handleUpload(file)
    if (!result.success) {
      alert(result.error || 'Upload failed')
    }

    e.target.value = null // reset input
  }

  return (
    <>
      {viewMode === 'list' ? (
        <LibraryToolbarButton onClick={handleClick}>
          {uploading ? (
            <span>Uploading...</span>
          ) : (
            <>
              <FiPlus size={18} />
              <span>Upload file</span>
            </>
          )}
        </LibraryToolbarButton>
      ) : (
        <AddTile viewMode={viewMode} onClick={handleClick}>
          {uploading ? <span>Uploading...</span> : <FiPlus size={32} />}
        </AddTile>
      )}

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
