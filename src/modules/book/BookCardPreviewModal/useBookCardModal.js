// src/modules/book/BookCardPreviewModal/useBookCardModal.js
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveLastBookId } from '@/utils'
import { useUpdateBookMutation } from '@/store/api/booksApi'
import { setActiveBookId } from '@/store/slices/bookSlice'
import { useDispatch } from 'react-redux'

export function useBookCardModal(book, onClose) {
  const [updateBook] = useUpdateBookMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Local form state: mirrors the structure of the book object
  const [form, setForm] = useState({ meta: {}, flags: {}, stats: {} })

  const [isEditingMain, setIsEditingMain] = useState(false)
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  useEffect(() => {
    if (!book) return

    setForm(structuredClone(book)) // Clone book data into form
    setIsEditingMain(false)
    setIsEditingNotes(false)
  }, [book])

  // Update meta, flags or stats depending on the field name
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      if (name in prev.meta) {
        return { ...prev, meta: { ...prev.meta, [name]: value } }
      }
      if (name in prev.flags) {
        return {
          ...prev,
          flags: {
            ...prev.flags,
            [name]:
              typeof prev.flags[name] === 'number'
                ? Number(value)
                : typeof prev.flags[name] === 'boolean'
                ? Boolean(value)
                : value,
          },
        }
      }
      if (name in prev.stats) {
        return {
          ...prev,
          stats: {
            ...prev.stats,
            [name]:
              typeof prev.stats[name] === 'number'
                ? Number(value)
                : value,
          },
        }
      }
      return prev
    })
  }

  const handleNotesChange = async (notesArray) => {
    setForm(prev => ({
      ...prev,
      flags: { ...prev.flags, notes: notesArray }
    }))

    if (!book?._id) return
    try {
      await updateBook({
        id: book._id,
        changes: { flags: { notes: notesArray } }
      }).unwrap()
    } catch (err) {
      console.error(' Failed to update notes', err)
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
          meta: {
            ...form.meta,
            updatedAt: new Date().toISOString(),
          },
          flags: { ...form.flags },
          stats: { ...form.stats },
        }
      }

      if (target === 'notes') {
        const currentText = form.flags?.notes || ''
        const newNote = {
          text: typeof currentText === 'string' ? currentText : '',
          page: null,
          createdAt: new Date(),
        }

        const existingNotes = Array.isArray(book.flags?.notes)
          ? book.flags.notes
          : []

        changes = {
          flags: {
            ...book.flags,
            notes: [...existingNotes, newNote],
          },
        }
      }

      await updateBook({
        id: book._id,
        changes
      }).unwrap()

      if (target === 'main') setIsEditingMain(false)
      if (target === 'notes') setIsEditingNotes(false)
    } catch (err) {
      console.error(` Save error (${target}):`, err)
    }
  }

  const handleRead = async () => {
    if (!book?._id) return
    dispatch(setActiveBookId(book._id))
    saveLastBookId(book._id)

    const now = new Date().toISOString()
    try {
      await updateBook({
        id: book._id,
        changes: {
          stats: { ...book.stats, lastOpenedAt: now },
        },
      })
      setForm(prev => ({
        ...prev,
        stats: { ...prev.stats, lastOpenedAt: now },
      }))
    } catch (err) {
      console.error(' Failed to update lastOpenedAt', err)
    }

    navigate(`/read/${book._id}`)
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
