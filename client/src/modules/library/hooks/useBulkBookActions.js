import { useUpdateBookMutation, useDeleteBookMutation } from '@/store/api/booksPrivateApi'

export default function useBulkBookActions() {
  const [updateBook] = useUpdateBookMutation()
  const [deleteBook] = useDeleteBookMutation()

  const archiveAll = async (ids = []) => {
        await Promise.all(
      ids.map((id) =>
        updateBook({ id, changes: { flags: { isArchived: true } } })
      )
    )
    
  }

  const deleteAll = async (ids = []) => {
        await Promise.all(ids.map((id) => deleteBook(id)))
  }

  return { archiveAll, deleteAll }
}