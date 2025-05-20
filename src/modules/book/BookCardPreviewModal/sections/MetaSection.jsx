import styled from "styled-components";
import { BookField } from "../fields/BookField";
import { Input } from "../fields/TextInput";
import { CustomSelectInput } from "../fields/CustomSelectInput"; // NEW!
import { TagsInput } from "../fields/TagsInput";
import TagsSection from "./TagsSection";

const GENRE_LIST = [
  "fantasy", "romance", "crime", "horror", "thriller", "sci-fi", "adventure",
  "literary fiction", "biography", "historical", "drama", "young adult"
];

const Wrapper = styled.div`
  grid-area: meta;
  background: rgba(33, 53, 91, 0.13);
  color: white;
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
    "totalPages addedAt"
    "language lastOpened"
    "collection documentType"
    "genre tags";
  gap: 0.8em 1.1em;
`;

const Language = styled(BookField)` grid-area: language;`;
const Genre = styled(BookField)` grid-area: genre;`;
const TotalPages = styled(BookField)` grid-area: totalPages;`;
const Collection = styled(BookField)` grid-area: collection;`;
const AddedAt = styled(BookField)` grid-area: addedAt;`;
const LastOpened = styled(BookField)` grid-area: lastOpened;`;
const DocumentType = styled(BookField)` grid-area: documentType;`;
const TagsArea = styled(BookField)` grid-area: tags;`;

const MetaSection = ({ form, isEditing, handleChange }) => {
  const meta = form?.meta || {};
  return (
    <Wrapper>
      <Language label="Language" $editable={isEditing}>
        {isEditing ? (
          <CustomSelectInput
            name="language"
            value={meta.language || ""}
            onChange={handleChange}
            options={['Polish', 'English', 'German', 'French', 'Spanish']}
          />
        ) : (
          meta.language || <span style={{ opacity: 0.45 }}>—</span>
        )}
      </Language>

      <AddedAt label="Added on">
        {meta.createdAt
          ? new Date(meta.createdAt).toLocaleDateString()
          : <span style={{ opacity: 0.45 }}>—</span>
        }
      </AddedAt>

      <TotalPages label="Page count" $editable={isEditing}>
        {isEditing ? (
          <Input name="totalPages" value={meta.totalPages || ""} onChange={handleChange} />
        ) : (
          meta.totalPages || <span style={{ opacity: 0.45 }}>—</span>
        )}
      </TotalPages>

      <LastOpened label="Last opened">
        {form.stats?.lastOpenedAt
          ? new Date(form.stats.lastOpenedAt).toLocaleDateString()
          : <span style={{ opacity: 0.45 }}>—</span>
        }
      </LastOpened>

      <Collection label="Collection" $editable={isEditing}>
        {isEditing ? (
          <Input name="collection" value={meta.collection || ""} onChange={handleChange} />
        ) : (
          meta.collection || <span style={{ opacity: 0.45 }}>—</span>
        )}
      </Collection>

      <DocumentType label="Document type">
        {meta.documentType || <span style={{ opacity: 0.45 }}>—</span>}
      </DocumentType>

      <Genre label="Genre" $editable={isEditing}>
        {isEditing ? (
          <>
            <Input
              name="genre"
              value={meta.genre || ""}
              onChange={handleChange}
              list="genre-suggestions"
              placeholder="e.g. fantasy"
            />
            <datalist id="genre-suggestions">
              {GENRE_LIST.map(opt => (
                <option key={opt} value={opt} />
              ))}
            </datalist>
          </>
        ) : (
          meta.genre || <span style={{ opacity: 0.45 }}>—</span>
        )}
      </Genre>

      <TagsArea label="Tags" $editable={isEditing}>
        {isEditing ? (
          <TagsInput name="tags" value={meta.tags || []} onChange={handleChange} />
        ) : (
          <TagsSection tags={meta.tags || []} />
        )}
      </TagsArea>
    </Wrapper>
  );
};

export default MetaSection;
