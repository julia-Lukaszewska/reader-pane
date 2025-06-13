// booksPrivateApi/index.js

export { booksApi } from './booksApi'

// Hooki z endpointów
export {
  useGetBooksQuery,
  useGetBooksStaticQuery,
} from './bookEndopoints/booksApiCollection'

export {
  useUploadBookMutation,
} from './bookEndopoints/booksApiUpload'

export {
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
} from './bookEndopoints/bookApiSingle'

export {
  useUpdateBookRatingMutation,
} from './bookEndopoints/booksApiForm'

export {
  useGetProgressQuery,
  useUpdateProgressMutation,
  useUpdateLastOpenedMutation,
} from './bookEndopoints/bookApiStats'
