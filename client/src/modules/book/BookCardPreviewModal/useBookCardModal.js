/**
 * @file useBookCardModal.js
 * @description Custom hook for managing book preview modal state and form logic.
 */

import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useUpdateBookMutation, booksApi } from '@/store/api/booksPrivateApi'
import { useOpenReader } from '@/modules/reader/hooks'

//-----------------------------------------------------------------------------
// Hook: useBookCardModal
//-----------------------------------------------------------------------------

/**
 * Provides state and handlers for the book preview modal, including
 * form state management, edit/save/cancel actions, and Redux/API sync.
 *
 * @param {Object} book - Book object to display/edit in modal
 * @param {Function} onClose - Callback to close the modal
 * @returns {UseBookCardModalResult}
 */
export function useBookCardModal(book, onClose) {

  const [updateBook] = useUpdateBookMutation()
 
  const dispatch = useDispatch()
  const openReader = useOpenReader(book?._id)
 
  const [form, setForm] = useState({ meta: {}, flags: {}, stats: {} })
  const [isEditingMain, setIsEditingMain] = useState(false)
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  //--- Initialize form state from book object
  useEffect(() => {
    if (!book) return
    setForm(structuredClone(book))
    setIsEditingMain(false)
    setIsEditingNotes(false)
  }, [book])

  /**
   * Updates the local form state based on input field changes.
   * Supports nested updates for `meta`, `flags`, and `stats`.
   * @param {Event} e - Input change event
   */
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
            [name]: typeof prev.stats[name] === 'number' ? Number(value) : value,
          },
        }
      }
      return prev
    })
  }

  /**
   * Updates notes in the form and persists them via API and RTK Query cache.
   * @param {Array} notesArray - Array of note objects
   */
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

  /**
   * Enables edit mode for the selected target section.
   * @param {'main'|'notes'} target
   */
  const handleEdit = (target) => {
    if (target === 'main') setIsEditingMain(true)
    if (target === 'notes') setIsEditingNotes(true)
  }

  /**
   * Cancels edit mode and resets form state.
   * @param {'main'|'notes'} target
   */
  const handleCancel = (target) => {
    if (book) setForm(structuredClone(book))
    if (target === 'main') setIsEditingMain(false)
    if (target === 'notes') setIsEditingNotes(false)
  }

  /**
   * Saves the form changes to the backend and updates RTK Query cache.
   * Supports both main and notes sections.
   * @param {'main'|'notes'} target
   */
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
        changes,
      }).unwrap()

      patchBookCache(book._id, changes)

      if (target === 'main') setIsEditingMain(false)
      if (target === 'notes') setIsEditingNotes(false)
    } catch (err) {
      console.error(`Save error (${target}):`, err)
    }
  }

  /**
   * Opens the selected book in reader view and closes modal.
   */
  const handleRead = () => {
    if (!book?._id) return
    openReader()
    onClose?.()
  }

  /**
   * Updates book data in RTK Query cache (both list and detail views).
   * @param {string} bookId - ID of the book
   * @param {Object} changes - Partial update to apply
   */
  const patchBookCache = (bookId, changes) => {
    dispatch(
      booksApi.util.updateQueryData('getBooks', undefined, draft => {
        const b = draft.find(b => b._id === bookId)
        if (b) Object.assign(b, changes)
      })
    )

    dispatch(
      booksApi.util.updateQueryData('getBookById', bookId, draft => {
        Object.assign(draft, changes)
      })
    )
  }

  /**
   * @typedef {Object} UseBookCardModalResult
   * @property {Object} form - Local editable copy of the book object (meta, flags, stats)
   * @property {boolean} isEditingMain - Whether main form is currently being edited
   * @property {boolean} isEditingNotes - Whether note field is currently being edited
   * @property {Function} handleChange - Updates local form state based on input event
   * @property {Function} handleEdit - Enables edit mode for target section ('main' or 'notes')
   * @property {Function} handleCancel - Cancels editing and resets local form state
   * @property {Function} handleSave - Persists changes to backend and updates Redux
   * @property {Function} handleRead - Navigates to reader view for the current book
   * @property {Function} handleNotesChange - Updates note array and saves to backend/Redux
   */

  /** @type {UseBookCardModalResult} */
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
