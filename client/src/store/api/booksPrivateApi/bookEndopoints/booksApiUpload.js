/**
 * @file booksApiUpload.js
 * @description
 * Endpoint for uploading a new book (PDF + metadata).
 */
import { booksApi } from '../booksApi'

//-----------------------------------------------------
//------ booksApiUpload Endpoints
//-----------------------------------------------------
export const booksApiUpload = booksApi.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    //-------------------------------------------------
    //------ uploadBook Mutation
    //-------------------------------------------------
    /**
     * @function uploadBook
     * @description Uploads a new book’s PDF file and metadata via FormData.
     * @param {FormData} formData - The PDF and book details payload.
     * @returns {object} Mutation object with status and data.
     * Invalidates book lists on success.
     */
    uploadBook: builder.mutation({
      query: formData => ({
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
})

//-----------------------------------------------------
//------ Hooks Export
//-----------------------------------------------------
export const { useUploadBookMutation } = booksApiUpload
