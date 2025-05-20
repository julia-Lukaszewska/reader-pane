import React from 'react';
import styled from 'styled-components';
import { IoCloseOutline } from 'react-icons/io5';
import  SelectCheckbox  from './SelectCheckbox';
import  CardButtons  from './CardButtons';
import { useSelector } from 'react-redux';
import { selectIsManageMode } from '@/store/selectors';
const Row = styled.tr`
  &:nth-child(even) { background: rgba(255, 255, 255, 0.05); }
`;
const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
`;
const IconTd = styled(Td)`
  text-align: right;
  cursor: pointer;
`;

const TableRow = ({ book, onOpenPreview, onRemoveClick }) => {
  const isManageMode = useSelector(selectIsManageMode);

  return (
    <Row onClick={onOpenPreview}>
      <Td onClick={e=>e.stopPropagation()}>
        {isManageMode && <SelectCheckbox bookId={book._id} />}
      </Td>
      <Td>{book.meta.title}</Td>
      <Td>{book.meta.author}</Td>
      <Td>{new Date(book.meta.createdAt).toLocaleDateString()}</Td>
      <Td><CardButtons book={book} /></Td>
      <IconTd onClick={e=>{e.stopPropagation(); onRemoveClick();}}>
        <IoCloseOutline />
      </IconTd>
    </Row>
  );
};

export default TableRow;
