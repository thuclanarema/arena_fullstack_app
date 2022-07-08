import { ActionList, Button, Checkbox, DataTable, Popover, Stack } from '@shopify/polaris'
import { MobileVerticalDotsMajor } from '@shopify/polaris-icons'
import { useState } from 'react'
import Avatar from '../../components/Avatar/index.jsx'

function Table(props) {
  const { users, onEdit, onDelete } = props

  const [selected, setSelected] = useState(null)

  let rows = []
  if (users.items.length) {
    rows = users.items.map((item, index) => [
      index + 1,
      <Stack spacing="tight" wrap={false}>
        <Stack.Item>
          <Avatar alt={item.fullName} src={item.avatar} size="3em" />
        </Stack.Item>
        <Stack.Item>
          <p>
            <b>{item.fullName}</b>
          </p>
          <p>
            <i>{item.username}</i>
          </p>
        </Stack.Item>
      </Stack>,
      item.email,
      item.gender ? 'Male' : 'Female',
      item.country?.name,
      <Popover
        active={item.id === selected?.id}
        activator={
          <Button
            onClick={() => setSelected(selected?.id === item.id ? null : item)}
            icon={MobileVerticalDotsMajor}
            outline
          ></Button>
        }
        onClose={() => setSelected(null)}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              content: 'Preview',
              onAction: () => {
                setSelected(null)
              },
            },
            {
              content: 'Edit',
              onAction: () => {
                onEdit(item)
                setSelected(null)
              },
            },
            {
              content: 'Delete',
              onAction: () => {
                onDelete(item)
                setSelected(null)
              },
            },
          ]}
        />
      </Popover>,
    ])
  }

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'text', 'text', 'text', , 'text']}
      headings={['No.', 'User', 'Email', 'Gender', 'Country', 'Action']}
      rows={rows}
    />
  )
}

export default Table
