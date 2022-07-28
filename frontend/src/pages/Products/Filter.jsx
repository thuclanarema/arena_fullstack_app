import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ActionList, Button, ButtonGroup, Popover, Stack, Tag, TextField } from '@shopify/polaris'

Filter.propTypes = {
  filter: PropTypes.object,
  onChange: PropTypes.func,
  vendors: PropTypes.array,
}

Filter.defaultProps = {
  filter: {},
  onChange: () => null,
  vendors: [],
}
function Filter(props) {
  const { filter, onChange, vendors } = props

  const [statusActive, setStatusActive] = useState(false)
  const [vendorActive, setVendorActive] = useState(false)

  const [search, setSearch] = useState(filter.keyword)

  const handleSearch = () => {
    setSearch(search)
  }

  const statusActionLists = [
    {
      content: 'ACTIVE',
      value: 'ACTIVE',
      onAction: () => onChange({ ...filter, status: 'ACTIVE' }),
    },
    {
      content: 'DRAFT',
      value: 'DRAFT',
      onAction: () => onChange({ ...filter, status: 'DRAFT' }),
    },
    {
      content: 'ARCHIVED',
      value: 'ARCHIVED',
      onAction: () => onChange({ ...filter, status: 'ARCHIVED' }),
    },
  ]

  const vendorActionLists = vendors.map((item, index) => ({
    content: item.name,
    value: '' + item.id,
    onAction: () => onChange({ ...filter, vendorId: '' + item.id }),
  }))

  return (
    <Stack vertical alignment="fill">
      <Stack>
        <Stack.Item fill>
          <TextField
            value={search}
            placeholder="Search.."
            onChange={() => handleSearch}
            clearButton
          />
        </Stack.Item>
        <Stack.Item>
          <ButtonGroup segmented>
            <Popover
              active={statusActive}
              activator={
                <Button disclosure onClick={() => setStatusActive(!statusActive)}>
                  Status
                </Button>
              }
              onClose={() => setStatusActive(false)}
            >
              <ActionList actionRole="menuitem" items={statusActionLists} />
            </Popover>
            <Popover
              active={vendorActive}
              activator={
                <Button disclosure onClick={() => setVendorActive(!vendorActive)}>
                  Vendor
                </Button>
              }
              onClose={() => setVendorActive(false)}
            >
              <ActionList actionRole="menuitem" items={vendorActionLists} />
            </Popover>
          </ButtonGroup>
        </Stack.Item>
      </Stack>
      <Stack></Stack>
    </Stack>
  )
}

export default Filter
