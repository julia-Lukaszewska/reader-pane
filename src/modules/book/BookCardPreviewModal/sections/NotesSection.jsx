import { useState, useEffect } from "react";
import styled from "styled-components";
import NoteItem from "./NoteItem";

const Wrapper = styled.div`
  grid-area: notes;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

function ensureId(notes) {
  return notes.map(n => n.id ? n : { ...n, id: n.createdAt || crypto.randomUUID() });
}

export default function NotesSection({
  form,
  handleNotesChange,
  readOnly = false,
}) {
  const [localNotes, setLocalNotes] = useState(() =>
    ensureId(Array.isArray(form.flags?.notes) && form.flags.notes.length > 0
      ? form.flags.notes
      : [{ id: crypto.randomUUID(), text: "", createdAt: new Date().toISOString() }]
    )
  );

  useEffect(() => {
    setLocalNotes(
      ensureId(Array.isArray(form.flags?.notes) && form.flags.notes.length > 0
        ? form.flags.notes
        : [{ id: crypto.randomUUID(), text: "", createdAt: new Date().toISOString() }]
      )
    );
  }, [form.flags?.notes]);

  const handleNoteSave = (id, value) => {
    const updated = [{ id, text: value, createdAt: new Date().toISOString() }];
    setLocalNotes(updated);
    if (handleNotesChange) handleNotesChange(updated);
  };

  
  const note = localNotes[0];

  return (
    <Wrapper>
      <NoteItem
        note={note}
        onSave={handleNoteSave}
        readOnly={readOnly}
      />
    </Wrapper>
  );
}
