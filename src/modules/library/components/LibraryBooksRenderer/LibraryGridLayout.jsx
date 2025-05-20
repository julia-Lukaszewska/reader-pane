import React from 'react';
import styled from 'styled-components';
import { BookCard } from '@/modules/book';
import { AddBookTile } from '@/modules/uploadPDF';

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, var(--tile-size));

  gap: 1.5rem;
  padding: 2rem;
  width: 100%;
  justify-content: start;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
`;

const LibraryGridLayout = ({ books , hideAddTile}) => {
  return (
    <BooksGrid>
       {!hideAddTile && <AddBookTile />}
      {books.map((book) => (
        <BookCard key={book._id} book={book} viewType="grid" />
      ))}
    </BooksGrid>
  );
};

export default LibraryGridLayout;
