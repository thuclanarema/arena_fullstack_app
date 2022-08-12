import { Card, RangeSlider, Stack } from '@shopify/polaris'
import React from 'react'

function FilterByPrice(props) {
  const { value, onChange } = props

  const prefix = '$'
  const min = 0
  const max = 15000
  const step = 10

  return (
    <Card sectioned title="Minimum requirements">
      <RangeSlider
        output
        label="Money spent is between"
        value={value}
        prefix={prefix}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </Card>
  )
}
export default FilterByPrice
