import React from 'react'
import styled from 'styled-components'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`

const Button = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`

const Info = styled.span`
  color: var(--text-primary);
`

export default function PaginationControls({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  return (
    <Wrapper>
      <Button onClick={() => onChange(page - 1)} disabled={page <= 1}>
        <IoChevronBack />
      </Button>
      <Info>{page} / {totalPages}</Info>
      <Button onClick={() => onChange(page + 1)} disabled={page >= totalPages}>
        <IoChevronForward />
      </Button>
    </Wrapper>
  )
}
