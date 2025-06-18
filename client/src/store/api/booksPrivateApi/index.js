/**
 * @file booksPrivateApi/index.js
 * @description
 * Central export for the booksPrivateApi RTK Query slice and hooks.
 */

//-----------------------------------------------------
//------ Core API Export
//-----------------------------------------------------
export { booksApi } from './booksApi'

//-----------------------------------------------------
//------ Queries: List & Static Endpoints
//-----------------------------------------------------
export {
  useGetBooksQuery,
  useGetBooksStaticQuery,
} from './bookEndopoints/booksApiCollection'

//-----------------------------------------------------
//------ Mutations: Upload
//-----------------------------------------------------
export {
  useUploadBookMutation,
} from './bookEndopoints/booksApiUpload'

//-----------------------------------------------------
//------ Single-Book Endpoints
//-----------------------------------------------------
export {
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
} from './bookEndopoints/bookApiSingle'
//-----------------------------------------------------
//------ Single-Book flags
//-----------------------------------------------------
export {
  useUpdateBookFlagsMutation

} from './bookEndopoints/bookApiFlags'

//-----------------------------------------------------
//------ Form-Related Endpoints: File URL, Notes, Bookmarks, Rating
//-----------------------------------------------------
export {
  useGetBookFileUrlQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useUpdateBookRatingMutation,
} from './bookEndopoints/booksApiForm'

//-----------------------------------------------------
//------ Live & Stats Endpoints: Real-Time Data & Progress
//-----------------------------------------------------
export {
  useGetBookLiveQuery,
  useUpdateBookLiveMutation,
  useGetProgressQuery,
  useUpdateProgressMutation,
  useUpdateProgressAutoMutation,
  useUpdateLastOpenedMutation,
} from './bookEndopoints/bookApiStats'
