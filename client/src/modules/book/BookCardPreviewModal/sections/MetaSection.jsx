/**
 * @file MetaSection.jsx
 * @description Displays the editable and static metadata fields of the book (language, genre, tags, dates, etc.)
 */

import styled from 'styled-components'
import { BookField } from '../fields/BookField'
import { Input } from '../fields/TextInput'
import  CustomSelectInput  from '@book/BookCardPreviewModal/fields/CustomSelectInput' 
import { TagsInput } from '../fields/TagsInput'
import TagsSection from './TagsSection'

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------

const GENRE_LIST = [
  'fantasy', 'romance', 'crime', 'horror', 'thriller', 'sci-fi', 'adventure',
  'literary fiction', 'biography', 'historical', 'drama', 'young adult'
]

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Wrapper for the whole metadata grid
const Wrapper = styled.div`
  grid-area: meta;
  background: rgba(33, 53, 91, 0.13);
  color: white;
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
    'totalPages addedAt'
    'language lastOpened'
    'collection documentType'
    'genre tags';
  gap: 0.8em 1.1em;
`

//--- Field wrappers

const Language = styled(BookField)` grid-area: language; `
const Genre = styled(BookField)` grid-area: genre; `
const TotalPages = styled(BookField)` grid-area: totalPages; `
const Collection = styled(BookField)` grid-area: collection; `
const AddedAt = styled(BookField)` grid-area: addedAt; `
const LastOpened = styled(BookField)` grid-area: lastOpened; `
const DocumentType = styled(BookField)` grid-area: documentType; `
const TagsArea = styled(BookField)` grid-area: tags; `

//-----------------------------------------------------------------------------
// Component: MetaSection
//-----------------------------------------------------------------------------

/**
 * Renders a structured section with book metadata such as language, genre, tags,
 * number of pages, dates, and collection. Supports edit mode.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.form - Book object with `meta` and `stats`
 * @param {boolean} props.isEditing - Whether edit mode is active
 * @param {Function} props.handleChange - Handler for field changes
 */

/**
 * @todo Add editable dropdown for language selection
 * 
 * - If `meta.language` is empty or not extracted from PDF, show a <CustomSelectInput> when `isEditing` is true
 * - Provide a list of common languages (e.g., English, Polish, German)
 * - Allow user to manually select a language during book edit
 * - Update value via `handleChange` and persist changes to backend
 * - Fallback: if no language selected, default to 'unknown' or empty string
 */

/**
 * @todo Reactivate tag editing after tag system is finalized
 * - Temporarily disabled TagsInput
 * - Tags are currently read-only via <TagsSection />
 * - Re-enable editing once tag CRUD and UI logic is ready
 */

const MetaSection = ({ form, isEditing, handleChange }) => {
  const meta = form?.meta || {}
  console.log('[MetaSection] meta:', meta)
console.log('[MetaSection] meta.addedAt:', meta?.addedAt)


  return (
    <Wrapper>
      <Language label='Language'>
      {meta.language || <span style={{ opacity: 0.45 }}>—</span>}
      </Language>

      <AddedAt label='Added on'>
        {meta.addedAt        
          ? new Date(meta.addedAt).toLocaleDateString()
          : <span style={{ opacity: 0.45 }}>—</span>}
      </AddedAt>

      <TotalPages label='Page count' $editable={false}>
        {meta.totalPages || <span style={{ opacity: 0.45 }}>—</span>}
      </TotalPages>

      <LastOpened label='Last opened'>
        {form.stats?.lastOpenedAt
          ? new Date(form.stats.lastOpenedAt).toLocaleDateString()
          : <span style={{ opacity: 0.45 }}>—</span>}
      </LastOpened>

      <Collection label='Collection' $editable={isEditing}>
        {isEditing ? (
          <Input
            name='collection'
            value={meta.collection || ''}
            onChange={handleChange}
          />
        ) : (
          meta.collection || <span style={{ opacity: 0.45 }}>—</span>
        )}
      </Collection>

      <DocumentType label='Document type'>
        {meta.documentType || <span style={{ opacity: 0.45 }}>—</span>}
      </DocumentType>

      <Genre label='Genre' $editable={isEditing}>
        {isEditing ? (
          <>
            <Input
              name='genre'
              value={meta.genre || ''}
              onChange={handleChange}
              list='genre-suggestions'
              placeholder='e.g. fantasy'
            />
            <datalist id='genre-suggestions'>
              {GENRE_LIST.map(opt => (
                <option key={opt} value={opt} />
              ))}
            </datalist>
          </>
        ) : (
          meta.genre || <span style={{ opacity: 0.45 }}>—</span>
        )}
      </Genre>

      <TagsArea label='Tags' $editable={false}>
      {/* 
      {isEditing ? (
        <TagsInput
          name='tags'
          value={meta.tags || []}
          onChange={handleChange}
        />
      ) : ( 
      */}
        <TagsSection tags={meta.tags || []} />
      {/* )} */}
    </TagsArea>
    
    </Wrapper>
  )
}

export default MetaSection
