import React from 'react'
import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import SelectCheckbox from './SelectCheckbox'
import CardButtons from './CardButtons'
import { useSelector } from 'react-redux'
import { selectIsManageMode } from '@/store/selectors'

/* --------------------------------------------- */
/*                   Styled                      */
/* --------------------------------------------- */

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 1.2rem;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 5% 55% 20% 15% 5%; /* Cover / Info / Date / Buttons / Delete/Checkbox */
  align-items: center;
  padding: 1.2rem 2rem;
  background: var(--glass-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(6px);
  transition: transform 0.2s ease, background 0.2s ease;

  ${({ $isManageMode }) =>
    !$isManageMode &&
    `
    cursor: pointer;
    &:hover {
      transform: translateY(-2px);
      background: var(--gradient-main);
    }
  `}
`

const Cover = styled.img`
  width: 48px;
  height: 64px;
  object-fit: cover;
  border-radius: 0.4rem;
  box-shadow: var(--glass-shadow);
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
`


const Title = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50%;  
  `

const Author = styled.div`
  color: var(--text-secondary);
  font-size: 0.75rem;
  margin-top: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DateText = styled.div`
  color: var(--text-secondary);
  font-size: 0.8rem;
  white-space: nowrap;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Remove = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: var(--text-secondary);
  cursor: pointer;
  &:hover {
    color: var(--color-accent);
  }
`

/* --------------------------------------------- */
/*                    Component                  */
/* --------------------------------------------- */

const ListItem = ({ book, onOpenPreview, onRemoveClick }) => {
  const isManageMode = useSelector(selectIsManageMode)

  const dateRaw = book?.meta?.createdAt
  const formattedDate = dateRaw
    ? new Date(dateRaw).toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '—'

  return (
    <ItemWrapper>
      <Row
        onClick={!isManageMode ? onOpenPreview : undefined}
        $isManageMode={isManageMode}
      >
        <Cover src={book.meta?.cover} alt="cover" />

        <Info>
          <Title>{book.meta?.title}</Title>
          <Author>{book.meta?.author || 'Unknown'}</Author>
        </Info>

        <DateText>{formattedDate}</DateText>

        <Actions>
          <CardButtons book={book} />
        </Actions>

        {isManageMode ? (
          <SelectCheckbox bookId={book._id} />
        ) : (
          <Remove
            onClick={(e) => {
              e.stopPropagation()
              onRemoveClick()
            }}
          >
            <IoCloseOutline />
          </Remove>
        )}
      </Row>
    </ItemWrapper>
  )
}

export default ListItem
