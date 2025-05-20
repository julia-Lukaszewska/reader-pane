
import styled from "styled-components"
const CoverWrapper = styled.div`
  width: 100%;
  aspect-ratio: 2/3;
  grid-area: cover;
  display: flex;
  align-items: center;
  justify-content: center;


  overflow: hidden;
`
const Placeholder = styled.div`
  font-size: var(--modal-lg);
  width: 100%;

  padding: 1.0em;
  text-align: center;

  color: rgba(200,210,255,.42);
  letter-spacing: .05em;
`
const Img = styled.img`
  width: 98%;
  height: 98%;
  object-fit: cover;
  display: block;
`
export default function CoverSection({ cover, title }) {
  return (
    <CoverWrapper>
      {cover ? (
        <Img src={cover} alt={title} />
      ) : (
        <Placeholder>No Cover</Placeholder>
      )}
    </CoverWrapper>
  )
}
