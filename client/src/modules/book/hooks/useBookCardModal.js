import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOpenReader } from '@reader/hooks'
import useEditBook from './useEditBook'
import {
  setForm,
  updateMetaField,
  updateFlagField,
  setEditingMain,
  setEditingNotes,
} from '@/store/slices/bookModalSlice'
import {
  selectBookModalForm,
  selectIsEditingMain,
  selectIsEditingNotes,
} from '@/store/selectors'

export default function useBookCardModal(book) {
  const dispatch = useDispatch()
  const form = useSelector(selectBookModalForm)
  const isEditingMain = useSelector(selectIsEditingMain)
  const isEditingNotes = useSelector(selectIsEditingNotes)
  const openReader = useOpenReader(book?._id)
  const { editBook } = useEditBook()

  useEffect(() => {
    dispatch(setForm(book))
  }, [book, dispatch])

  const handleChange = e => {
    const { name, value } = e.target
    if (name in form.meta) {
      dispatch(updateMetaField({ name, value }))
    } else if (name in form.flags) {
      const currentType = typeof form.flags[name]
      let parsed = value
      if (currentType === 'boolean') parsed = value === 'true' || value === true
      else if (currentType === 'number') parsed = Number(value)
      dispatch(updateFlagField({ name, value: parsed }))
    }
  }

  const handleFlagFieldChange = (name, value) => {
    dispatch(updateFlagField({ name, value }))
  }

  const handleNotesChange = async notesArray => {
    dispatch(updateFlagField({ name: 'notes', value: notesArray }))
    if (book?._id) await editBook(book._id, { flags: { notes: notesArray } })
  }

  const handleEdit = target => {
    if (target === 'main') dispatch(setEditingMain(true))
    if (target === 'notes') dispatch(setEditingNotes(true))
  }

  const handleCancel = target => {
    if (book) dispatch(setForm(book))
    if (target === 'main') dispatch(setEditingMain(false))
    if (target === 'notes') dispatch(setEditingNotes(false))
  }

  const handleSave = async target => {
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
    if (target === 'main') dispatch(setEditingMain(false))
    if (target === 'notes') dispatch(setEditingNotes(false))
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