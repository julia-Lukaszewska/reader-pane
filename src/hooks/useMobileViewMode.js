// //-----------------------------------------------------------------------------
// // useMobileViewMode: adjust book viewMode based on window width
// //-----------------------------------------------------------------------------

// import { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useUpdateBookMutation } from '@/store/api/booksApi'
// import { useGetBookQuery } from '@/store/api/booksApi'

// export default function useMobileViewMode() {
//   const { bookId } = useParams()
//   const validId = typeof bookId === 'string' && bookId !== 'undefined'

//   const { data: book } = useGetBookQuery(validId ? bookId : skipToken)
//   const [updateBook] = useUpdateBookMutation()

//   useEffect(() => {
//     if (!book) return

//     const handleResize = () => {
//       const width = window.innerWidth
//       const desiredMode = width < 768 ? 'single' : 'continuous'
//       const currentMode = book?.flags?.viewMode

//       if (desiredMode !== currentMode) {
//         updateBook({
//           id: bookId,
//           changes: {
//             flags: { ...(book.flags || {}), viewMode: desiredMode },
//           },
//         })
//       }
//     }

//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [bookId, book, updateBook])
// }
