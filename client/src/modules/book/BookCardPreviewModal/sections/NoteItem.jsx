/**
 * @file NoteItem.jsx
 * @description Editable note component for book details with optional read-only mode.
 */

import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { BookField } from '../fields/BookField'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Display-only note content
const NoteContent = styled.div`
  min-height: 4em;
  padding: 0.8em 0.15em 0.8em 0.6em;
  cursor: pointer;
  border-radius: 0.7em;
  background: ${({ $empty }) =>
    $empty
      ? 'rgba(28, 38, 68, 0.123)' 
      : 'rgba(28, 38, 68, 0.123)'};
  flex: 1 1 100%;
  transition: background .16s;
  overflow-y: auto;
`

//--- Editable textarea for notes
const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 0;
  flex: 1 1 auto;
  resize: none;
  border-radius: 0.7em;
  padding: 0.8em 0.7em;
  background: rgba(34,51,115,0.14);
  border: .1em solid #3a6ef07b;
  box-shadow: 0 1px 8px 0 rgba(80,140,230,0.08);
  outline: none;
  font-family: inherit;
  transition: box-shadow .18s, border-color .15s, background .14s;
  overflow-y: auto;

  &:focus {
    background: rgba(38,66,140,0.16);
    border-color: var(--color-blue-400, #579dff4c);
    box-shadow: 0 0 0 2px var(--color-blue-200, #9fc4c417);
  }
`

//--- Row displaying the date of last edit
const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6em;
`

//--- Static label for date
const DateLabel = styled.span``

//-----------------------------------------------------------------------------
// Component: NoteItem
//-----------------------------------------------------------------------------

/**
 * Displays a single note with optional edit mode.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.note - Note object containing `id`, `text`, and `createdAt`
 * @param {Function} props.onSave - Callback to save updated text
 * @param {boolean} props.readOnly - If true, disables editing
 */
export default function NoteItem({ note, onSave, readOnly }) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(note.text || '')
  const textareaRef = useRef(null)

  useEffect(() => {
    setValue(note.text || '')
    setIsEditing(false)
  }, [note.id, note.text])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [isEditing])

  const save = () => {
    setIsEditing(false)
    if (value !== note.text) onSave(note.id, value)
  }

  const handleBlur = () => {
    save()
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (textareaRef.current) textareaRef.current.blur()
    }
  }

  const handleSave = () => {
    save()
  }

  return (
    <BookField label='Note' $editable={isEditing && !readOnly}>
      {isEditing && !readOnly ? (
        <StyledTextarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder='add note'
        />
      ) : (
        <NoteContent
          $empty={!note.text}
          onClick={() => !readOnly && setIsEditing(true)}
        >
          {note.text || <span style={{ opacity: 0.48 }}>Click to add note</span>}
        </NoteContent>
      )}
      <DateRow>
        {isEditing && !readOnly ? (
          <button onClick={handleSave}>Save note</button>
        ) : (
          <>
            <DateLabel>Last edited:</DateLabel>
            <span>
              {note.createdAt
                ? new Date(note.createdAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })
                : ''}
            </span>
          </>
        )}
      </DateRow>
    </BookField>
  )
}
