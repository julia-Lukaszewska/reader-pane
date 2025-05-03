// -----------------------------------------------------------------------------
//------ ButtonsModal: Actions inside BookPreviewModal 
// -----------------------------------------------------------------------------

import React from 'react'
import { Actions } from './ModalStyles'
import { Button } from '@/components' 

const ButtonsModal = ({
  isEditing,
  handleEdit,
  handleSave,
  handleRead,
  handleClose,
}) => {
  return (
    <Actions>
      {!isEditing ? (
        <Button $variant="modal_primary" onClick={handleEdit}>
          Edit
        </Button>
      ) : (
        <Button $variant="modal_primary" onClick={handleSave}>
          Save
        </Button>
      )}
      <Button $variant="modal_secondary" onClick={handleRead}>
        Read
      </Button>
      <Button $variant="modal_secondary" onClick={handleClose}>
        Close
      </Button>
    </Actions>
  )
}

export default React.memo(ButtonsModal)
