import styled from 'styled-components' // Styling with styled-components  
import Btn from './Btn' // Custom button component  

// -----------------------------------------------------------------------------
//------ Styled components  
// -----------------------------------------------------------------------------

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--backdrop-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(6px);
`  

const ModalBox = styled.div`
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  color: var(--color-dark-900);
  padding: 2.4rem;
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  max-width: 420px;
  width: 90%;
  text-align: center;
`  

const Title = styled.h3`
  margin-bottom: 1.6rem;
  font-size: 1.8rem;
  text-shadow: var(--glass-text-shadow);
`  

const BtnRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 1.2rem;
  flex-wrap: wrap;
`  

// -----------------------------------------------------------------------------
//------ ConfirmModal component  
// -----------------------------------------------------------------------------

const ConfirmModal = ({
  bookTitle,  
  onTrash,  
  onConfirm,  
  onCancel,  
  variant = 'library',  
}) => {
  const isLibrary = variant === 'library' // Delete with archive option  
  const isPermanent = variant === 'permanent-delete' // Permanent delete  
  const isRestore = variant === 'restore' // Restore from trash  

  return (
    <Overlay onClick={onCancel}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {' '}
        
        <Title>
          {isLibrary && `Are you sure you want to delete "${bookTitle}"?`}
          {isPermanent &&
            `Are you sure you want to permanently delete "${bookTitle}"?`}
          {isRestore && `Restore "${bookTitle}" to library?`}
        </Title>
        <BtnRow>
          {isLibrary && (
            <>
              <Btn $variant="button_secondary" onClick={onTrash}>
                Archive
              </Btn>
              <Btn $variant="button_primary" onClick={onConfirm}>
                Delete
              </Btn>
            </>
          )}

          {(isPermanent || isRestore) && (
            <>
              <Btn $variant="button_primary" onClick={onConfirm}>
                Yes
              </Btn>
              <Btn $variant="button_secondary" onClick={onCancel}>
                No
              </Btn>
            </>
          )}
        </BtnRow>
        {isLibrary && (
          <Btn
            $variant="button_link"
            onClick={onCancel}
            style={{ marginTop: '1.4rem' }}
          >
            Cancel
          </Btn>
        )}
      </ModalBox>
    </Overlay>
  )
}

export default ConfirmModal // Export modal component  
