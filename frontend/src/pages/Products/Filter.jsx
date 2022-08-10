import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  ActionList,
  Button,
  ButtonGroup,
  Card,
  Popover,
  RangeSlider,
  Stack,
  Tag,
  TextField,
} from '@shopify/polaris'

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

  const initialValue = [800, 1000]

  const [statusActive, setStatusActive] = useState(false)
  const [vendorActive, setVendorActive] = useState(false)
  const [priceActive, setPriceActive] = useState(false)
  const [rangePrice, setRangePrice] = useState(initialValue)
  const [publishActive, setPublishActive] = useState(0)

  // console.log('price', price)

  const [search, setSearch] = useState(filter.keyword || '')

  const handleSearch = (value) => {
    setSearch(value)

    if (window.__searchTimeout) {
      clearTimeout(window.__searchTimeout)
    }

    window.__searchTimeout = setTimeout(() => {
      onChange({ ...filter, keyword: value })
    }, 600)
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

  const publishActionLists = [
    {
      content: 'True',
      value: 'True',
      onAction: () => onChange({ ...filter, publish: 'True' }),
    },
    {
      content: 'False',
      value: 'False',
      onAction: () => onChange({ ...filter, publish: 'False' }),
    },
  ]

  const vendorActionLists = vendors.map((item, index) => ({
    content: item.name,
    value: '' + item.id,
    onAction: () => onChange({ ...filter, vendorId: '' + item.id }),
  }))

  const handlePriceChange = useCallback((value) => setRangePrice(value), [])

  return (
    <Stack vertical alignment="fill">
      <Stack>
        <Stack.Item fill>
          <TextField
            value={search}
            onChange={(value) => handleSearch(value)}
            placeholder="Search..."
            clearButton
            onClearButtonClick={() => setSearch('') & onChange({ ...filter, keyword: '' })}
          />
        </Stack.Item>
        <Stack.Item>
          <ButtonGroup segmented>
            <Popover
              active={publishActive}
              activator={
                <Button disclosure onClick={() => setPublishActive(!publishActive)}>
                  Publish
                </Button>
              }
              onClose={() => setPublishActive(false)}
            >
              <ActionList actionRole="menuitem" items={publishActionLists} />
            </Popover>

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

            <Popover
              active={priceActive}
              activator={
                <Button disclosure onClick={() => setPriceActive(!priceActive)}>
                  Ranger
                </Button>
              }
              onClose={() => setPriceActive(false)}
            >
              <ActionList actionRole="menuitem" />
              {priceActive && (
                <Card sectioned title="Price">
                  <RangeSlider
                    output
                    label="Price spent is between"
                    value={rangePrice}
                    min={10}
                    max={3000}
                    step={10}
                    onChange={handlePriceChange}
                  />
                </Card>
              )}
            </Popover>
          </ButtonGroup>
        </Stack.Item>
      </Stack>
      <Stack>
        {Boolean(filter.status) && (
          <Tag onRemove={() => onChange({ ...filter, status: '' })}>
            Status:{statusActionLists.find((item) => item.value === filter.status).content}
          </Tag>
        )}
        {Boolean(filter.publish) && (
          <Tag onRemove={() => onChange({ ...filter, publish: '' })}>
            Publish: {publishActionLists.find((item) => item.value === filter.publish).content}
          </Tag>
        )}
        {Boolean(filter.vendorId) && (
          <Tag onRemove={() => onChange({ ...filter, vendorId: '' })}>
            vendorId:{vendorActionLists.find((item) => item.value === filter.vendorId).content}
          </Tag>
        )}
      </Stack>
    </Stack>
  )
}

export default Filter
