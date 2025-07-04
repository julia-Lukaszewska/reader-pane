/**
 * @file HeaderSection.jsx
 * @description Displays book title, author, year and favorite toggle in the preview modal header.
 */

import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { FaHeart } from 'react-icons/fa'
import { BookField } from '../fields/BookField'
import { Input } from '../fields/TextInput'
import { selectBookModalForm, selectIsEditingMain } from '@/store/selectors'
import { updateMetaField } from '@/store/slices/bookModalSlice'
import useBookActions from '@book/hooks/useBookActions'
import useUpdateSingleBookFlag from '@book/hooks/useUpdateSingleBookFlag'
//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Main wrapper for the modal header
const Wrapper = styled.div`
  display: grid;
  grid-area: header;
  background: var(--modal-bg-02);
  gap: 0.9em 1em;
  padding: 0.7em 0.9em;
  grid-template-columns: 1.7fr 1fr 2.2em;
  grid-template-rows: auto auto;
  grid-template-areas: 
    "title year heart"
    "author author heart";
`

//--- Section for title field
const TitleArea = styled.div` 
  display: -webkit-box;
  max-height: 9.1em ;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  grid-area: title;
  overflow: hidden;
`

//--- Section for year field
const YearArea = styled.div` grid-area: year; `

//--- Section for author field
const AuthorArea = styled.div` grid-area: author; `

//--- Section for favorite icon
const HeartArea = styled.div`
  grid-area: heart;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;
`

//--- Favorite toggle button
const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active }) => $active ? 'rgb(214, 0, 64)' : 'rgba(211, 211, 211, 0.616)'};
  
  transition: color .12s, filter .13s, transform .12s;
  margin-top: 0.13em;
 font-size: 2.2em;
  &:hover {
    color: rgb(214, 0, 64);
    transform: scale(1.08);
  }
`

//--- Placeholder for empty values
const Placeholder = styled.span`
  opacity: 0.9;
`

//-----------------------------------------------------------------------------
// Component: HeaderSection
//-----------------------------------------------------------------------------

/**
 * Header section of the book preview modal.
 * Renders editable/non-editable fields for title, author, year and favorite toggle.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.form - Book data object with `meta` and `flags`
 * @param {boolean} props.isEditing - Determines if fields are editable
 * @param {Function} props.handleChange - Change handler for editable fields
 */
const HeaderSection = () => {
 const dispatch = useDispatch()

  const form = useSelector(selectBookModalForm)
  const isEditing = useSelector(selectIsEditingMain)

  const { meta = {}, flags = {}, _id } = form
  const isFavorited = flags.isFavorited ?? false

  const setIsFavorited = useUpdateSingleBookFlag(_id, 'isFavorited')

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(updateMetaField({ name, value }))
  }


  return (
    <Wrapper>
      <TitleArea>
        <BookField label="Title" $editable={isEditing}>
          {isEditing ? (
            <Input name="title" value={meta.title || ''} onChange={handleChange} />
          ) : (
            meta.title || <Placeholder>—</Placeholder>
          )}
        </BookField>
      </TitleArea>

      <YearArea>
        <BookField label="Year of Publication">
          {meta.publishedYear || <Placeholder>—</Placeholder>}
        </BookField>
      </YearArea>

      <AuthorArea>
        <BookField label="Author" $editable={isEditing}>
          {isEditing ? (
            <Input name="author" value={meta.author || ''} onChange={handleChange} />
          ) : (
            meta.author || <Placeholder>—</Placeholder>
          )}
        </BookField>
      </AuthorArea>

      <HeartArea>
        <HeartButton
          type="button"
          $active={isFavorited}
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          onClick={toggleFavorite}
        >
          <FaHeart />
        </HeartButton>
      </HeartArea>
    </Wrapper>
  )
}
export default HeaderSection
