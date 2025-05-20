import styled from "styled-components"
import ProgressBar from "@book/components/ProgressBar"
import { StarRatingInput } from "../fields/StarRatingInput"
import { useGetBookQuery, useUpdateBookMutation } from "@/store"

const RatingGrid = styled.div`
  display: grid;
  grid-area: rating;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "read"
    "stars"
    "progress";
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ReadButton = styled.button`
  grid-area: read;
  margin-top: 0.9em;
  padding: 0.7em 1.8em;
  border-radius: 0.9em;
  border: none;
  font-weight: 600;
  background: linear-gradient(90deg, rgba(40,130,255,0.32), rgba(100,190,255,0.18));
  color: #fff;
  box-shadow: 0 0 18px 1.5px rgba(34,124,255,0.12);
  cursor: pointer;
  transition: background 0.13s;
  &:hover {
    background: rgba(40,130,255,0.44);
  }
`

const Row = styled.div`
  grid-area: stars;
  display: grid;
  grid-auto-flow: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
`

const ProgressWrapper = styled.div`
  grid-area: progress;
  display: flex;
  justify-content: center;
  width: 100%;
`

export default function RatingSection({ form, onChange, handleRead }) {
  const bookId = form._id
  const { data: bookData, isLoading } = useGetBookQuery(bookId, { skip: !bookId })
  const [updateBook] = useUpdateBookMutation()
  const rating = form.flags?.rating ?? 0

  const totalPages = isLoading
    ? form.meta?.totalPages ?? 1
    : bookData?.meta?.totalPages ?? 1

  const setRating = value =>{
    onChange({ target: { name: 'rating', value } })

updateBook({
  id: bookId,
  changes: {
    flags: { rating: value }  
  }
})}
  return (
    <RatingGrid>
      <ReadButton onClick={handleRead}>Read</ReadButton>

      <Row>
        <StarRatingInput value={rating} onChange={e => setRating(e.target.value)} />
      </Row>

      <ProgressWrapper>
        <ProgressBar bookId={bookId} totalPages={totalPages} />
      </ProgressWrapper>
    </RatingGrid>
  )
}
