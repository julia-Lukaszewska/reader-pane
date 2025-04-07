import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'

// -----------------------------------------------------------------------------
//------ Styled Components   
// -----------------------------------------------------------------------------

const AddTile = styled.div`
  aspect-ratio: 2 / 3;
  width: var(--book-size, 150px);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  color: var(--color-dark-900);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
  font-size: 0.9rem;
  padding: 1rem;
  transition: all 0.3s ease;

  svg {
    font-size: 3rem;
    stroke-width: 3;
    color: var(--color-icon-default);
  }

  &:hover {
    background-color: var(--bg-icon-hover);
    transform: translateY(-4px);
    box-shadow: var(--shadow-icon-hover);
  }
`

// -----------------------------------------------------------------------------
//------ AddBookTile Component   
// -----------------------------------------------------------------------------

const AddBookTile = () => {
  return (
    <AddTile>
      <FiPlus />
      <span>Dodaj książkę</span>
      <small>Wgraj PDF</small>
    </AddTile>
  )
}

export default AddBookTile
