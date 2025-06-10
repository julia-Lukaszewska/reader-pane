/**
 * @file ImportFromWolneLektury.jsx
 * @description Component that allows importing books from Wolne Lektury API and uploading them to the user's library.
 */  

import React, { useState } from 'react'
import { useGetWolneLekturyQuery } from '@/store/api/externalApi'
import { useUploadBookMutation } from '@/store/api/booksPrivateApi'
import { createBook } from '@/modules/book/utils'
import { useBookActions } from '@/modules/book/hooks'

//-----------------------------------------------------------------------------
// Component: ImportFromWolneLektury
//-----------------------------------------------------------------------------

/**
 * Displays a list of books from Wolne Lektury API with option to import them.
 * On import, downloads the PDF, uploads it to the backend and adds it to Redux state.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onBack - Callback to return to the library view
 * @returns {JSX.Element}
 */
const ImportFromWolneLektury = ({ onBack }) => {
  const [loadingBookId, setLoadingBookId] = useState(null)

  const { addBookToLibrary } = useBookActions()
  const [uploadBook] = useUploadBookMutation()
  const { data: books = [], error, isLoading } = useGetWolneLekturyQuery()

  /**
   * Handles importing a single book:
   * 1. Downloads PDF
   * 2. Uploads file to backend
   * 3. Creates local book object
   * 4. Adds to frontend library
   *
   * @param {Object} book - Book object from Wolne Lektury API
   */
  const handleImport = async (book) => {
    try {
      setLoadingBookId(book.slug)

      // 1) Download the PDF file
      const response = await fetch(book.pdf)
      if (!response.ok) throw new Error('Failed to download PDF')

      const blob = await response.blob()
      const file = new File([blob], `${book.slug}.pdf`, {
        type: 'application/pdf',
      })

      // 2) Prepare FormData for upload
      const formData = new FormData()
      formData.append('file', file)
      formData.append('totalPages', 1) // Placeholder – backend will count

      // 3) Upload to backend
      const uploadedBook = await uploadBook(formData).unwrap()

      // 4) Add to Redux store
      const newBook = createBook(uploadedBook)
      addBookToLibrary(newBook)

      alert(`Imported "${book.title}" successfully!`)
    } catch (error) {
      console.error('Error importing book:', error)
      alert('Import failed.')
    } finally {
      setLoadingBookId(null)
    }
  }

  //--- Handle loading or error states
  if (isLoading) return <p className='p-4'>Loading...</p>
  if (error) return <p className='p-4 text-red-500'>Error loading books.</p>

  //--- Render book list
  return (
    <div className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold'>Import from Wolne Lektury</h2>
        <button
          onClick={onBack}
          className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700'
        >
          Back to Library
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {books.map((book) => (
          <div
            key={book.slug}
            className='flex flex-col justify-between p-4 border rounded bg-white/10 backdrop-blur-md'
          >
            <div className='mb-2'>
              <strong className='block text-lg mb-1'>{book.title}</strong>
              <p className='text-sm text-gray-300'>{book.author}</p>
            </div>

            <button
              onClick={() => handleImport(book)}
              disabled={loadingBookId === book.slug}
              className='mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50'
            >
              {loadingBookId === book.slug ? 'Importing...' : 'Import'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImportFromWolneLektury
