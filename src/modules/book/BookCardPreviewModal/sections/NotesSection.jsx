/**
 * @file NotesSection.jsx
 * @description Displays and manages a single editable note associated with a book.
 */

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import NoteItem from './NoteItem'

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

//--- Ensures that each note has an `id` (based on `createdAt` or random UUID)
function ensureId(notes) {
  return notes.map(n =>
    n.id ? n : { ...n, id: n.createdAt || crypto.randomUUID() }
  )
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
export default function NotesSection({
  form,
  handleNotesChange,
  readOnly = false,
}) {
  //--- Initialize notes state with fallback if missing
  const [localNotes, setLocalNotes] = useState(() =>
    ensureId(
      Array.isArray(form.flags?.notes) && form.flags.notes.length > 0
        ? form.flags.notes
        : [{ id: crypto.randomUUID(), text: '', createdAt: new Date().toISOString() }]
    )
  )

  //--- Update localNotes when form.notes changes
  useEffect(() => {
    setLocalNotes(
      ensureId(
        Array.isArray(form.flags?.notes) && form.flags.notes.length > 0
          ? form.flags.notes
          : [{ id: crypto.randomUUID(), text: '', createdAt: new Date().toISOString() }]
      )
    )
  }, [form.flags?.notes])

  //--- Save updated note
  const handleNoteSave = (id, value) => {
    const updated = [{ id, text: value, createdAt: new Date().toISOString() }]
    setLocalNotes(updated)
    if (handleNotesChange) handleNotesChange(updated)
  }

  //--- Get the first (and only) note
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
