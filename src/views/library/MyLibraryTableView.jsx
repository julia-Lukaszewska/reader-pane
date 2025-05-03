import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectFilteredBooks } from '@/store'
import { AddBookTile, TableRow } from '@/components'
import { SelectCheckbox } from '@/components'

const TableWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
  overflow-x: auto;
`
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`
const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid var(--border-color);
  color: var(--text-secondary);
`
const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
`
const AddRow = styled.tr`
  td {
    padding: 1rem 0;
  }
`
const EmptyRow = styled.tr`
  td {
    padding: 2rem;
    color: var(--text-secondary);
    font-style: italic;
    text-align: center;
  }
`

const MyLibraryTableView = () => {
  const books = useSelector(selectFilteredBooks)

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th style={{ width: 32 }} />
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Date added</Th>
            <Th style={{ width: 32 }} />
          </tr>
        </thead>
        <tbody>
          <AddRow>
            <Td style={{ width: 32 }} />
            <Td colSpan={3}>
              <AddBookTile />
            </Td>
            <Td style={{ width: 32 }} />
          </AddRow>

          {books.length === 0 ? (
            <EmptyRow>
              <Td colSpan={5}>No books — add first!</Td>
            </EmptyRow>
          ) : (
            books.map((b) => <TableRow key={b._id} bookId={b._id} />)
          )}
        </tbody>
      </Table>
    </TableWrapper>
  )
}

export default MyLibraryTableView
