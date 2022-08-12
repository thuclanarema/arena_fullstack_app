import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  ActionList,
  Button,
  ButtonGroup,
  Card,
  Icon,
  Popover,
  Stack,
  Tag,
  TextField,
} from '@shopify/polaris'
import { SortMinor } from '@shopify/polaris-icons'
import FilterByPrice from './FilterByPrice'
import FilterBySort from './FilterBySort'

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
  const [priceActive, setPriceActive] = useState(false)
  const [choiceActive, setChoiceActive] = useState(false)
  const [publishActive, setPublishActive] = useState(0)

  const [search, setSearch] = useState(filter.keyword || '')

  const initialValue = [900, 1000]

  const [rangeValue, setRangeValue] = useState(initialValue)

  const handleRangeSliderChange = useCallback((value) => {
    setRangeValue(value)

    if (window.__searchTimeout) {
      clearTimeout(window.__searchTimeout)
    }

    window.__searchTimeout = setTimeout(() => {
      onChange({ ...filter, price: `${value[0]}-${value[1]}` })
    }, 600)
  }, [])

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

  const choiceSortLists = [
    {
      content: 'Product title A–Z',
      value: 'Product title A–Z',
      onAction: () => onChange({ ...filter, sort: 'title%asc' }),
    },
    {
      content: 'Product title Z–A',
      value: 'Product title Z–A',
      onAction: () => onChange({ ...filter, sort: 'title%desc' }),
    },
    {
      content: 'Created (oldest first)',
      value: 'Created (oldest first)',
      onAction: () => onChange({ ...filter, sort: 'createdAt%asc' }),
    },
    {
      content: 'Created (newest first)',
      value: 'Created (newest first)',
      onAction: () => onChange({ ...filter, sort: 'createdAt%desc' }),
    },
    {
      content: 'Updated (oldest first)',
      value: 'Updated (oldest first)',
      onAction: () => onChange({ ...filter, sort: 'updateAt%asc' }),
    },
    {
      content: 'Updated (newest first)',
      value: 'Updated (newest first)',
      onAction: () => onChange({ ...filter, sort: 'updateAt%desc' }),
    },
    {
      content: 'Low inventory',
      value: 'Low inventory',
      onAction: () => onChange({ ...filter, sort: 'price%asc' }),
    },
    {
      content: 'High inventory',
      value: 'High inventory',
      onAction: () => onChange({ ...filter, sort: 'price%desc' }),
    },
    {
      content: 'Vendor A–Z',
      value: 'Vendor A–Z',
      onAction: () => onChange({ ...filter, sort: 'vendor%asc' }),
    },
    {
      content: 'Vendor Z–A',
      value: 'Vendor Z–A',
      onAction: () => onChange({ ...filter, sort: 'vendor%desc' }),
    },
  ]

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
              onClose={() => setPriceActive(true)}
            >
              <ActionList actionRole="menuitem" />
              {}
            </Popover>

            <Popover
              active={choiceActive}
              activator={
                <Button onClick={() => setChoiceActive(!choiceActive)}>
                  <Stack spacing="extraTight">
                    <Icon source={SortMinor} alt="Sort" />
                    <b>Sort</b>
                  </Stack>
                </Button>
              }
              onClose={() => setChoiceActive(false)}
            >
              <ActionList actionRole="menuitem" />
              {choiceActive && <FilterBySort choices={choiceSortLists} />}
            </Popover>
          </ButtonGroup>
        </Stack.Item>
      </Stack>
      {priceActive && (
        <FilterByPrice value={rangeValue} onChange={(value) => handleRangeSliderChange(value)} />
      )}
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
        {Boolean(filter.price) && (
          <Tag onRemove={() => onChange({ ...filter, price: '' }) & setPriceActive(false)}>
            Price:{`${rangeValue[0]} - ${rangeValue[1]}`}
          </Tag>
        )}
      </Stack>
    </Stack>
  )
}

export default Filter
