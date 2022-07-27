import { Button, Modal, TextContainer } from '@shopify/polaris'
import { useState, useCallback } from 'react'

function ConfirmDelete(props) {
  const { onDiscard, onDelete } = props

  return (
    <Modal
      activator={<Button onClick={() => {}}> </Button>}
      open={true}
      onClose={onDiscard}
      title="Are you sure want to delete?"
      secondaryActions={[
        {
          content: 'Discard',
          onAction: onDiscard,
        },
      ]}
      primaryAction={[
        {
          content: 'Delete now ',
          onAction: onDelete,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>This cannot be undone.</p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  )
}

export default ConfirmDelete
