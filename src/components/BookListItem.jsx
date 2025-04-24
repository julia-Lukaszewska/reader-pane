//-----------------------------------------------------------------------------
//------ BookListItem – alternative list-style view for books  
//-----------------------------------------------------------------------------

import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../context/AppContext'
import { saveLastBookId } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--gradient-main);
  color: white;
  padding: 1rem 1.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: var(--glass-shadow);
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: rgba(58, 138, 195, 0.86);
  }
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`

const Meta = styled.div`
  font-size: 1.5rem;
  opacity: 0.8;
`
const ProgressBar = styled.div`
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
  margin-top: 0.5rem;
`

const ProgressFill = styled.div`
  height: 100%;
  background: var(--color-accent);
  width: ${({ percent }) => percent}%;
  transition: width 0.3s ease;
`

const BookListItem = ({ book, onClick }) => {
  const { dispatch } = useContext(AppContext)

  const navigate = useNavigate()

  const current = book.currentPage || book.progress || 1  
  const total = book.totalPages

  const percent = (() => {
    if (!total || total <= 1) return current >= total ? 100 : 0
    const raw = ((current - 1) / (total - 1)) * 100
    return Math.min(100, Math.max(0, Math.round(raw)))
  })()

  const handleClick = () => {
    saveLastBookId(book._id)
    dispatch({ type: 'SET_ACTIVE_BOOK', payload: book })

    if (onClick) {
      onClick(book) //#PL:🔹 Wywołujemy modal, jeśli został przekazany #/
    } else {
      navigate(`/read/${book._id}`) //#PL: 🔹 Domyślna akcja: przejście do czytnika #/
    }
  }

  return (
    <Row onClick={handleClick}>
      <div>
        <Title>{book.title}</Title>
        <Meta>
          {book.author || 'author of the book unknown'} — page {current} of
          {book.totalPages}
        </Meta>
        <span style={{ fontSize: '2rem', opacity: 0.7 }}>{percent}% read</span>

        <ProgressBar>
          <ProgressFill percent={percent} />
        </ProgressBar>
      </div>
      <span>📖</span>
    </Row>
  )
}

export default BookListItem
