import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer';
import { selectLibraryViewMode } from '@/store/selectors';
import { useGetBooksQuery } from '@/store/api/booksApi';

const Container = styled.div`
  width: 100%;
  flex: 1;
`

const FavoritesView = () => {
  const viewMode = useSelector(selectLibraryViewMode);
  const { data: books = [], isLoading } = useGetBooksQuery();

  if (isLoading) return null;

  const favoriteBooks = books.filter(book => book.flags?.isFavorited && !book.flags?.isArchived);

  return ( <Container >
    <LibraryBooksRenderer books={favoriteBooks} viewMode={viewMode} />;
    </Container>

  );};

export default FavoritesView;
