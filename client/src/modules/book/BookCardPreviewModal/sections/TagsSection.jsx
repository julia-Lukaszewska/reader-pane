/**
 * @file TagsSection.jsx
 * @description Displays a list of tags as styled badge elements.
 */

import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Wrapper for tag elements
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45em;
  align-items: center;
`

//--- Individual tag badge
const Tag = styled.span`
  display: inline-block;
  background: var(--gradient-main-v3), linear-gradient(90deg,#7db6ff 0%,#5deed5 100%);
  color: var(--text-color-01);
  padding: 0.12em 1.1em;
  border-radius: 1.2em;
  font-weight: 600;
  box-shadow: 0 2px 12px 0 rgba(105,180,255,0.14);
  border: 1px solid rgba(186,242,255,0.12);
  opacity: .98;
  margin-bottom: 0.12em;
  text-shadow: 0 1px 2px rgba(0,0,0,.08);
  filter: blur(0) brightness(1.09);
  transition: filter .13s;

  &:hover {
    filter: brightness(1.13) saturate(1.12);
  }
`

//-----------------------------------------------------------------------------
// Component: TagsSection
//-----------------------------------------------------------------------------

/**
 * Displays a row of tags (non-editable view).
 *
 * @component
 * @param {Object} props
 * @param {string[]} props.tags - List of tag strings
 */
const TagsSection = ({ tags = [] }) => {
  //--- If no tags, render fallback
  if (!tags.length) return <span style={{ opacity: 0.45 }}>—</span>

  return (
    <TagList>
      {tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </TagList>
  )
}

export default TagsSection
