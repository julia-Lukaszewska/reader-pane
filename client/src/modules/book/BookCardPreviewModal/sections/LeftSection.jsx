/**
 * @file LeftSection.jsx
 * @description Left side of the preview modal – displays book cover and rating section.
 */

import styled from 'styled-components'
import CoverSection from './CoverSection'
import RatingSection from './RatingSection'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Wrapper for the entire left section
const LeftBox = styled.div`
  grid-area: left;
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: 4fr 2fr;
  grid-template-areas:
    "cover"
    "rating";
  gap: .8em;
  align-items: stretch;
  padding: 1em;
  box-shadow: 0 0 9em 0 rgba(34, 53, 122, 0.842);
  overflow: hidden;
`

//--- Generic section area used for placement
const SectionArea = styled.div`
  width: 100%;
  height: 100%;
`

//-----------------------------------------------------------------------------
// Component: LeftSection
//-----------------------------------------------------------------------------

/**
 * Left panel of the book preview modal.
 * Contains the cover image and rating section.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.form - Book data object with `meta` and `flags`
 * @param {boolean} props.isEditing - Whether fields are editable
 * @param {Function} props.handleChange - Form field change handler
 * @param {Function} props.handleRead - Handler for "Mark as read" or similar action
 */
const LeftSection = () => (
  <LeftBox>
    <SectionArea style={{ gridArea: 'cover' }}>
      <CoverSection />
    </SectionArea>

    <SectionArea style={{ gridArea: 'rating' }}>
      <RatingSection />
    </SectionArea>
  </LeftBox>
)

export default LeftSection
