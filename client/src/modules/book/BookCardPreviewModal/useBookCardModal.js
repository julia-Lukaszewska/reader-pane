import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useUpdateBookMutation, booksApi } from '@/store/api/booksPrivateApi'
import { useOpenReader } from '@/modules/reader/hooks'

export function useBookCardModal(book, onClose) {
  const [updateBook] = useUpdateBookMutation()
  const dispatch = useDispatch()
  const openReader = useOpenReader(book?._id)

  const [form, setForm] = useState({ meta: {}, flags: {}, stats: {} })
  const [isEditingMain, setIsEditingMain] = useState(false)
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  // Patch cache – moved up here to avoid usage before declaration
  const patchBookCache = (bookId, changes) => {
    dispatch(
      booksApi.util.updateQueryData('getBooks', undefined, draft => {
        const b = draft.find(b => b._id === bookId)
        if (b) Object.assign(b, changes)
      })
    )
    dispatch(
      booksApi.util.updateQueryData('getBookById', bookId, draft => {
        if (draft) Object.assign(draft, changes)
      })
    )
  }

  useEffect(() => {
    if (!book) return
    setForm(structuredClone(book))
    setIsEditingMain(false)
    setIsEditingNotes(false)
  }, [book])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      if (name in prev.meta) {
        return { ...prev, meta: { ...prev.meta, [name]: value } }
      }
      if (name in prev.flags) {
        const currentType = typeof prev.flags[name]
        const parsed =
          currentType === 'boolean' ? value === 'true' :
          currentType === 'number' ? Number(value) : value
        return { ...prev, flags: { ...prev.flags, [name]: parsed } }
      }
      if (name in prev.stats) {
        return {
          ...prev,
          stats: {
            ...prev.stats,
            [name]: typeof prev.stats[name] === 'number' ? Number(value) : value,
          },
        }
      }
      return prev
    })
  }

  const handleNotesChange = async (notesArray) => {
    setForm((prev) => ({
      ...prev,
      flags: { ...prev.flags, notes: notesArray },
    }))
    if (!book?._id) return
    try {
      await updateBook({
        id: book._id,
        changes: { flags: { notes: notesArray } },
      }).unwrap()
      patchBookCache(book._id, { flags: { notes: notesArray } })
    } catch (err) {
      console.error('Failed to update notes', err)
    }
  }

  const handleEdit = (target) => {
    if (target === 'main') setIsEditingMain(true)
    if (target === 'notes') setIsEditingNotes(true)
  }

  const handleCancel = (target) => {
    if (book) setForm(structuredClone(book))
    if (target === 'main') setIsEditingMain(false)
    if (target === 'notes') setIsEditingNotes(false)
  }

  const handleSave = async (target) => {
    if (!book) return
    try {
      let changes
      if (target === 'main') {
        changes = {
          meta: { ...form.meta, updatedAt: new Date().toISOString() },
          flags: { ...form.flags },
          stats: { ...form.stats },
        }
      }
      if (target === 'notes') {
        // Replace string-based notes with a valid array (or skip this part if unused)
        const notesArray = Array.isArray(form.flags.notes) ? form.flags.notes : []
        changes = { flags: { ...form.flags, notes: notesArray } }
      }

      await updateBook({ id: book._id, changes }).unwrap()
      patchBookCache(book._id, changes)
      if (target === 'main') setIsEditingMain(false)
      if (target === 'notes') setIsEditingNotes(false)
    } catch (err) {
      console.error(`Save error (${target}):`, err)
    }
  }

  const handleRead = () => {
    if (!book?._id) return
    openReader()
    onClose?.()
  }

  return {
    form,
    isEditingMain,
    isEditingNotes,
    handleChange,
    handleEdit,
    handleCancel,
    handleSave,
    handleRead,
    handleNotesChange,
  }
}
