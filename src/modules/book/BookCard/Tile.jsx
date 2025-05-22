/**
 * @file Tile.jsx
 * @description Book tile component for grid view, supports preview, select, and actions.
 */

import React from 'react'
import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import SelectCheckbox from './SelectCheckbox'
import CardButtons from './CardButtons'
import { useSelector } from 'react-redux'
import { selectIsManageMode } from '@/store/selectors'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Wrapper for the entire tile
const TileBox = styled.div`
  width: var(--tile-size);
  aspect-ratio: 2 / 3;
  flex: none;
  background: var(--gradient-main);
  backdrop-filter: blur(6px);
  border-radius: var(--border-radius);
  justify-content: space-between;
  box-shadow: var(--glass-shadow);
  padding: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  min-height: 0;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4%);
    box-shadow: var(--glass-shadow-hover);
  }
`

//--- Close button wrapper
const CloseWrapper = styled.div`
  position: absolute;
  top: 0.4em;
  right: 0.4em;
  z-index: 3;
  pointer-events: auto;
`

//--- Close icon
const Close = styled.span`
  font-size: 1.1em;
  color: var(--text-secondary);
  cursor: pointer;

  &:hover {
    color: var(--color-accent);
  }
`

//--- Title wrapper
const TitleWrapper = styled.div`
  height: 15%;
  width: 80%;
  padding-top: 6%;
  padding-bottom: 20%;
  padding-left: 8%;
  padding-right: 8%;
  display: flex;
  align-items: start;
  justify-content: center;
`

//--- Book title
const Title = styled.h3`
  font-size: 0.65em;
  font-weight: 600;
  text-align: center;
  color: var(--text-primary);
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;
`

//--- Cover container
const CoverWrapper = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 0 6%;
`

//--- Cover image
const Cover = styled.img`
  height: 100%;
  width: auto;
  object-fit: cover;
  object-position: center;
`

//--- Footer section for buttons
const Footer = styled.div`
  height: 12%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6%;
  padding-top: 2%;
`

//-----------------------------------------------------------------------------
// Component: Tile
//-----------------------------------------------------------------------------

const Tile = ({ book, onOpenPreview, onRemoveClick }) => {
  const isManageMode = useSelector(selectIsManageMode)

  return (
    <TileBox onClick={onOpenPreview}>
      {isManageMode && <SelectCheckbox bookId={book._id} isTile />}

      {!isManageMode && (
        <CloseWrapper>
          <Close
            onClick={(e) => {
              e.stopPropagation()
              onRemoveClick()
            }}
          >
            <IoCloseOutline />
          </Close>
        </CloseWrapper>
      )}

      <TitleWrapper>
        <Title>{book.meta.title}</Title>
      </TitleWrapper>

      <CoverWrapper>
        {book.meta.cover ? (
          <Cover src={book.meta.cover} alt={book.meta.title} />
        ) : (
          <span style={{ color: 'transparent' }}>No cover</span>
        )}
      </CoverWrapper>

      <Footer>
        <CardButtons book={book} />
      </Footer>
    </TileBox>
  )
}

export default Tile
