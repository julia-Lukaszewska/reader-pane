import { useState } from 'react'
import useBookForm  from './useBookForm'
import { useOpenReader } from '@reader/hooks'
import  useEditBook  from './useEditBook'

export default function useBookCardModal(book, onClose) {
  const { form, setForm, handleChange, handleFlagFieldChange } = useBookForm(book)
  const openReader = useOpenReader(book?._id)
  const { editBook } = useEditBook()

  const [isEditingMain, setIsEditingMain] = useState(false)
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  const handleNotesChange = async (notesArray) => {
    setForm(prev => ({
      ...prev,
      flags: { ...prev.flags, notes: notesArray },
    }))
    if (book?._id) await editBook(book._id, { flags: { notes: notesArray } })
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

    let changes = {}
    if (target === 'main') {
      changes = {
        meta: { ...form.meta, updatedAt: new Date().toISOString() },
        flags: { ...form.flags },
        stats: { ...form.stats },
      }
    }
    if (target === 'notes') {
      const notesArray = Array.isArray(form.flags.notes) ? form.flags.notes : []
      changes = { flags: { ...form.flags, notes: notesArray } }
    }

    await editBook(book._id, changes)
    if (target === 'main') setIsEditingMain(false)
    if (target === 'notes') setIsEditingNotes(false)
  }

  return {
    form,
    isEditingMain,
    isEditingNotes,
    handleChange,
    handleEdit,
    handleCancel,
    handleSave,
    handleFlagFieldChange,
    handleRead: openReader,
    handleNotesChange,
  }
}
