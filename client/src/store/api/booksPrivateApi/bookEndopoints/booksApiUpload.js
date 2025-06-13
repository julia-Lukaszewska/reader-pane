/**
 * @file booksApiUpload.js
 * @description
 * Endpoint for uploading a new book (PDF + metadata).
 */

import { booksApi } from '../booksApi'

//-----------------------------------------------------------------------------
// Endpoint: Upload Book (PDF + metadata)
//-----------------------------------------------------------------------------

export const booksApiUpload = booksApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Uploads a new book (PDF + metadata).
     * @param {FormData} formData - PDF and book details
     */
    uploadBook: builder.mutation({
      query: (formData) => ({
        url: '/books/storage',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [
        { type: 'Books', id: 'LIST' },
        { type: 'BooksStatic', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
})

//-----------------------------------------------------------------------------
// Exported RTK Query hook
//-----------------------------------------------------------------------------

export const { useUploadBookMutation } = booksApiUpload
