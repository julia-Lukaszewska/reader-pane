import styled from "styled-components"
import CoverSection from "./CoverSection"

import RatingSection from "./RatingSection"

const LeftBox = styled.div`
  grid-area: left;
  display: grid;
  width: 100%;
  height: 100%;


  grid-template-rows: 4fr 2fr;
  grid-template-areas:
    "cover"
    "rating"
   ;
  gap: .8em;
  align-items: stretch;
  padding: 1em;
  box-shadow: 0 0 9em 0 rgba(34, 53, 122, 0.842);
  overflow: hidden;
`

const SectionArea = styled.div`
  width: 100%;
  height: 100%;
`

const LeftSection = ({ form, isEditing, handleChange ,handleRead}) => (
  <LeftBox>
    <SectionArea style={{ gridArea: "cover" }}>
      <CoverSection cover={form.meta.cover} title={form.meta.title} />
    </SectionArea>
    <SectionArea style={{ gridArea: "rating" }}>
      <RatingSection
        form={form}
        isEditing={isEditing}
        onChange={handleChange}
        handleRead={handleRead}
      />
    </SectionArea>
   
  </LeftBox>
)

export default LeftSection
