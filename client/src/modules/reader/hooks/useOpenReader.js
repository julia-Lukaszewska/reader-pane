/**
 * @file useOpenReader.js
 * @description Returns a callback that navigates to reader view for the given book.
 */

import { useNavigate } from 'react-router-dom'

/**
 * Provides a function to open the reader for a book.
 *
 * @param {string} bookId - Identifier of the book to open
 * @returns {Function} - Callback that navigates to `/read/{bookId}`
 */
export default function useOpenReader(bookId) {
  const navigate = useNavigate()

  return () => {
    navigate(`/read/${bookId}`)
  }
}