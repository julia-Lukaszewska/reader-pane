import { useUpdateBookMutation, useDeleteBookMutation } from '@/store/api/booksPrivateApi'

export default function useBulkBookActions() {
  const [updateBook] = useUpdateBookMutation()
  const [deleteBook] = useDeleteBookMutation()

  const archiveAll = async (ids = []) => {
    for (const id of ids) {
      await updateBook({ id, changes: { flags: { isArchived: true } } })
    }
  }

  const deleteAll = async (ids = []) => {
    for (const id of ids) {
      await deleteBook(id)
    }
  }

  return { archiveAll, deleteAll }
}