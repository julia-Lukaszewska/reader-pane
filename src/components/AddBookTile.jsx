import styled from 'styled-components' // Styling with styled-components  
import { FiPlus } from 'react-icons/fi' // Plus icon from Feather icons  

// -----------------------------------------------------------------------------
//------ AddTile styled component  
// -----------------------------------------------------------------------------

const AddTile = styled.div`
  aspect-ratio: 2 / 3;
  width: var(--book-size, 150px);
  background: var(--gradient-main);
  backdrop-filter: blur(6px);
  border-radius: var(--border-radius-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
  font-size: 0.9rem;
  padding: 1rem;

  svg {
    font-size: 3rem;
    stroke-width: 3;
    color: white;
  }

  &:hover {
    transform: translateY(-4px);
    background-color: rgba(58, 138, 195, 0.86);
  }
`  

// -----------------------------------------------------------------------------
//------ AddBookTile component  
// -----------------------------------------------------------------------------

const AddBookTile = ({ inputRef }) => {
  return (
    <AddTile onClick={() => inputRef.current?.click()}>
      <FiPlus />
      <span>Dodaj książkę</span> 
      <small>Wgraj PDF</small> 
    </AddTile>
  )
}

export default AddBookTile // Export component  
