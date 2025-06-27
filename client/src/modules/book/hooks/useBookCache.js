/**
 * @file useBookCache.js
 * @description Optimistically patch both:
 *    • booksApi.getBooks   → { data: [ … ], meta: { … } }
 *    • booksApi.getBookById → { data: { … }, meta: { … } }
 */

import { useDispatch } from 'react-redux'
import { booksApi } from '@/store/api/booksPrivateApi'

export default function useBookCache() {
  const dispatch = useDispatch()

  /** shallow-merge only the meta/flags/stats keys */
   const mergeBook = (target, changes) => {
    if (!target || typeof target !== 'object') return
    if (changes.meta)  Object.assign(target.meta  ??= {}, changes.meta)
    if (changes.flags) Object.assign(target.flags ??= {}, changes.flags)
    if (changes.stats) Object.assign(target.stats ??= {}, changes.stats)
  }

   
  const patchBook = (bookId, changes) => {

    const undoList = dispatch(
      booksApi.util.updateQueryData('getBooks', undefined, draft => {
        if (!draft?.entities) return
        const book = draft.entities[bookId]
        if (book) mergeBook(book, changes)
      })
    )

    // 2) single-book cache → draft.data is the book object
    const undoOne = dispatch(
      booksApi.util.updateQueryData('getBookById', bookId, draft => {
        if (draft?.data) mergeBook(draft.data, changes)
      })
    )

    // return undo so you can rollback on error if you like
    return () => {
      undoList.undo()
      undoOne.undo()
    }
  }

  return { patchBook }
}
