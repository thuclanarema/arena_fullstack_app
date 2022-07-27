import { ActionList, Button, DataTable, Popover, Stack, Thumbnail } from '@shopify/polaris'
import { MobileVerticalDotsMajor } from '@shopify/polaris-icons'
import { useState } from 'react'
import Avatar from '../../components/Avatar/index.jsx'

function Table(props) {
  const { items, page, limit, onEdit, onDelete } = props

  const [selected, setSelected] = useState(null)

  let rows = items.map((item, index) => [
    (page - 1) * limit + index + 1,
    <Stack vertical spacing="extraTight">
      <Stack spacing="tight" wrap={false}>
        <Stack.Item>
          <Avatar alt={item.title} src={item.thumbnail} size="3em" />
        </Stack.Item>
        <Stack.Item>
          <p>
            <b>{item.title}</b>
          </p>
          <p>
            <i>{item.description}</i>
          </p>
        </Stack.Item>
      </Stack>
      <Stack spacing="extraTight">
        {item.images?.length > 0 &&
          item.images.map((_item, _index) => (
            <Stack.Item key={_index}>
              <Thumbnail alt="" source={_item} size="small" />
            </Stack.Item>
          ))}
      </Stack>
    </Stack>,
    <Stack vertical spacing="extraTight">
      <Stack.Item>Title: {item.title}</Stack.Item>
      <Stack.Item>Price: {item.price}</Stack.Item>
      <Stack.Item>Vendor: {item.vendor?.name}</Stack.Item>
      <Stack.Item>Status: {item.status}</Stack.Item>
      <Stack.Item>Published: {item.publish.toString()}</Stack.Item>
    </Stack>,
    <Popover
      active={item.id === selected?.id}
      activator={
        <Button
          onClick={() => setSelected(selected?.id === item.id ? null : item)}
          icon={MobileVerticalDotsMajor}
          outline
        />
      }
      onClose={() => setSelected(null)}
    >
      <ActionList
        actionRole="menuitem"
        items={[
          {
            content: 'Preview',
            onAction: () => setSelected(null),
          },
          {
            content: 'Edit',
            onAction: () => onEdit(item) & setSelected(null),
          },
          {
            content: 'Delete',
            onAction: () => onDelete(item) & setSelected(null),
          },
        ]}
      />
    </Popover>,
  ])

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'text', 'text']}
      headings={['No.', 'Product', 'Advanced', 'Action']}
      rows={rows}
    />
  )
}

export default Table
