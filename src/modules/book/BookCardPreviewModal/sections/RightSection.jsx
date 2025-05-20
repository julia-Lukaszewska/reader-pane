import styled from "styled-components";
import HeaderSection from "./HeaderSection";
import MetaSection from "./MetaSection";
import NotesSection from "./NotesSection";


const Wrapper = styled.div`
  grid-area: right;
  display: grid;
  width: 100%;
  max-height: 100%;
  background: rgba(250,250,255,0.04);

 
  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${({ $editing }) => $editing ? "auto 1fr" : "auto auto 1fr"};
  grid-template-areas: ${({ $editing }) =>
    $editing
      ? `"header header"
         "meta meta"`
      : `"header header"
         "meta meta"
         "notes notes"`
  };
  gap: 1.2em 0.9em;
  padding: 1.6em 2.2em 1em 1.5em;
  overflow-y: auto;
`;

export default function RightSection({
  form,
  isEditingNotes,
  isEditingMain,
  handleChange,
  handleEdit,
  handleNotesChange,
  handleCancel,
}) {
  return (
    <Wrapper $editing={isEditingMain}>
      <HeaderSection
        form={form}
        isEditing={isEditingMain}
        handleChange={handleChange}
      />
      <MetaSection
        form={form}
        isEditing={isEditingMain}
        handleChange={handleChange}
      />
      {!isEditingMain && (
        <NotesSection
          form={form}
          isEditingNotes={isEditingNotes}
          handleNotesChange={handleNotesChange}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
        />
      )}
    </Wrapper>
  );
}
