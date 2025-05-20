// src/modules/book/BookCardPreviewModal/sections/HeaderSection.jsx
import styled from "styled-components"
import { FaHeart } from "react-icons/fa"
import { BookField } from "../fields/BookField"
import { Input } from "../fields/TextInput"

const Wrapper = styled.div`
  display: grid;

  grid-area: header;
  background: rgba(46, 51, 80, 0.11);
  gap: 0.9em 1em;
  padding: 0.7em 0.9em;

  grid-template-columns: 1.7fr 1fr 2.2em;
  grid-template-rows: auto auto;
  grid-template-areas: 
    "title year heart"
    "author author heart";
`

const TitleArea = styled.div` 
display: -webkit-box;
max-height: 9.1em ;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
grid-area: title;
overflow: hidden;

`
const YearArea = styled.div` grid-area: year;`
const AuthorArea = styled.div` grid-area: author;`
const HeartArea = styled.div`
  grid-area: heart;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;
`
const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active }) => $active ? "rgb(214, 0, 64)" : "rgba(129, 129, 129, 0.39)"};
  filter: drop-shadow(0 0 0.6em ${({ $active }) => $active ? "#de3683cc" : "transparent"});
  transition: color .12s, filter .13s, transform .12s;


  margin-top: 0.13em;

  &:hover {
    color: rgb(214, 0, 64);
    transform: scale(1.08);
  }
`

const Placeholder = styled.span`
  opacity: 0.9;
`

const HeaderSection = ({ form, isEditing, handleChange }) => {
  const { meta = {}, flags = {} } = form
  const isFavorited = flags.isFavorited ?? false

  const toggleFavorite = () =>
    handleChange({ target: { name: "isFavorited", value: !isFavorited } })

  return (
    <Wrapper>
      <TitleArea>
        <BookField label="Title" $editable={isEditing}>
  {isEditing ? (
    <Input name="title" value={meta.title || ""} onChange={handleChange} />
  ) : (
    meta.title || <Placeholder>—</Placeholder>
  )}
</BookField>
      </TitleArea>

      <YearArea>
        <BookField label="Year of Publication" $editable={isEditing}>
          {isEditing ? (
            <Input name="publishedYear" value={meta.publishedYear || ""} onChange={handleChange} />
          ) : (
            meta.publishedYear || <Placeholder>—</Placeholder>
          )}
        </BookField>
      </YearArea>

      <AuthorArea>
        <BookField label="Author" $editable={isEditing}>
          {isEditing ? (
            <Input name="author" value={meta.author || ""} onChange={handleChange} />
          ) : (
            meta.author || <Placeholder>—</Placeholder>
          )}
        </BookField>
      </AuthorArea>

      <HeartArea>
        <HeartButton
          type="button"
          $active={isFavorited}
          title={isFavorited ? "delete from favorites" : "add to favorites"}
          onClick={toggleFavorite}
        >
          <FaHeart />
        </HeartButton>
      </HeartArea>
    </Wrapper>
  )
}

export default HeaderSection
