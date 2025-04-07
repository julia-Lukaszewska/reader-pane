import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'

// -----------------------------------------------------------------------------
//------ Styled Components   
// -----------------------------------------------------------------------------

const Card = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
  background: var(--glass-bg); // ✅ szkło zależne od motywu
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  padding: 1rem;
  color: var(--color-dark-900); // ✅ dynamiczny kolor tekstu
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--bg-icon-hover);
    transform: translateY(-4px);
    box-shadow: var(--shadow-icon-hover);
  }
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4); // półprzezroczysta nakładka
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: var(--border-radius);
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  ${Card}:hover & {
    opacity: 1;
  }
`

const CloseBtn = styled.button`
  all: unset;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.4rem;
  color: var(--color-icon-default); // ✅ kolor ikony zależny od motywu
  cursor: pointer;
`

// -----------------------------------------------------------------------------
//------ BookTile Component   
// -----------------------------------------------------------------------------

const BookTile = () => {
  return (
    <Card>
      <CloseBtn aria-label="Usuń książkę">
        <IoCloseOutline />
      </CloseBtn>

      <h4>Tytuł książki</h4>
      <small>50% przeczytane</small>
      <Overlay>Czytaj</Overlay>
    </Card>
  )
}

export default BookTile
