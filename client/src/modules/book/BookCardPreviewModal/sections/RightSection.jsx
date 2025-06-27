/**
 * @file RightSection.jsx
 * @description Right panel of the preview modal – includes header, metadata, and optional notes section.
 */

import styled from 'styled-components'
import HeaderSection from './HeaderSection'
import MetaSection from './MetaSection'
import NotesSection from './NotesSection'
import { useSelector } from 'react-redux'
import { selectIsEditingMain } from '@/store/selectors'
//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Wrapper for the right-side content layout
const Wrapper = styled.div`
  grid-area: right;
  display: grid;
  width: 100%;
  max-height: 100%;
  background: rgba(250,250,255,0.04);

  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${({ $editing }) => $editing ? 'auto 1fr' : 'auto auto 1fr'};
  grid-template-areas: ${({ $editing }) =>
    $editing
      ? `"header header"
         "meta meta"`
      : `"header header"
         "meta meta"
         "notes notes"`};
  gap: 1.2em 0.9em;
  padding: 1.6em 2.2em 1em 1.5em;
  overflow-y: auto;
`

//-----------------------------------------------------------------------------
// Component: RightSection
//-----------------------------------------------------------------------------

/**
 * Right-side layout of the book preview modal.
 * Renders header, metadata, and conditionally notes section (if not editing).
 *
 * @component
 * @param {Object} props
 * @param {Object} props.form - Book form data
 * @param {boolean} props.isEditingNotes - Whether notes are being edited
 * @param {boolean} props.isEditingMain - Whether main form is being edited
 * @param {Function} props.handleChange - Handler for metadata changes
 * @param {Function} props.handleEdit - Callback to start editing notes
 * @param {Function} props.handleNotesChange - Callback for note save
 * @param {Function} props.handleCancel - Cancel editing notes
 */
export default function RightSection(){
const isEditingMain = useSelector(selectIsEditingMain)

  return (
    <Wrapper $editing={isEditingMain}>
      <HeaderSection />
      <MetaSection  />
      {!isEditingMain && (
     <NotesSection />
      )}
    </Wrapper>
  )
}
