import { Button, DisplayText, Stack } from '@shopify/polaris'
import { MobileBackArrowMajor } from '@shopify/polaris-icons'
import React from 'react'

function CreateForm(props) {
  const { created, onDiscard, vendor, onSubmit } = props
  console.log('created', created)
  return (
    <Stack>
      <Stack.Item>
        <Button icon={MobileBackArrowMajor} onClick={onDiscard}></Button>
      </Stack.Item>
      <Stack.Item>
        <DisplayText size="small">
          <b>{created?.id ? 'Edit' : 'Add'} Product</b>
        </DisplayText>
      </Stack.Item>
    </Stack>
  )
}
export default CreateForm
