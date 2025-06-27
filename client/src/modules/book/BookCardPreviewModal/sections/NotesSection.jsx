/**
 * @file NotesSection.jsx
 * @description Displays and manages a single editable note associated with a book.
 */

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { selectBookModalForm, selectPreviewBookId } from '@/store/selectors'
import { updateFlagField } from '@/store/slices/bookModalSlice'
import NoteItem from './NoteItem'
import useEditBook from '@book/hooks/useEditBook'
//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Wrapper for the notes area
const Wrapper = styled.div`
  grid-area: notes;
  display: flex;
  flex-direction: column;
  gap: 1em;
`

//-----------------------------------------------------------------------------
// Helper: ensureId
//-----------------------------------------------------------------------------

function genId() {
  if (crypto.randomUUID) return crypto.randomUUID()
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function ensureId(notes) {
  return notes.map(n => (n.id ? n : { ...n, id: n.createdAt || genId() }))
}
//-----------------------------------------------------------------------------
// Component: NotesSection
//-----------------------------------------------------------------------------

/**
 * Section for displaying and editing book notes.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.form - Book data object with `flags.notes`
 * @param {Function} props.handleNotesChange - Callback to save notes externally
 * @param {boolean} [props.readOnly=false] - If true, disables editing
 */
export default function NotesSection({ readOnly = false }) {
  const dispatch = useDispatch()
  const form = useSelector(selectBookModalForm)
  const bookId = useSelector(selectPreviewBookId)
  const { editBook } = useEditBook()
  const [localNotes, setLocalNotes] = useState(() =>
    ensureId(
      Array.isArray(form.flags?.notes) && form.flags.notes.length > 0
        ? form.flags.notes
        : [{ id: crypto.randomUUID(), text: '', createdAt: new Date().toISOString() }]
    )
  )

  useEffect(() => {
    setLocalNotes(
      ensureId(
        Array.isArray(form.flags?.notes) && form.flags.notes.length > 0
          ? form.flags.notes
             : [{ id: genId(), text: '', createdAt: new Date().toISOString() }]
      )
    )
  }, [form.flags?.notes])

  const handleNoteSave = async (id, value) => {
    const updated = [{ id, text: value, createdAt: new Date().toISOString() }]
    setLocalNotes(updated)
    dispatch(updateFlagField({ name: 'notes', value: updated }))
        if (bookId) await editBook(bookId, { flags: { notes: updated } })
  }

  const note = localNotes[0]

  return (
    <Wrapper>
      <NoteItem
        note={note}
        onSave={handleNoteSave}
        readOnly={readOnly}
      />
    </Wrapper>
  )
}