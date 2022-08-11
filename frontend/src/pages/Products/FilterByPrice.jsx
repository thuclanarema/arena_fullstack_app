import { Button, Card, RangeSlider, Stack } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'

function FilterByPrice() {
  const initialValue = [900, 1000]
  const prefix = '$'
  const min = 0
  const max = 2000
  const step = 10

  const [rangeValue, setRangeValue] = useState(initialValue)

  const handleRangeSliderChange = useCallback((value) => {
    setRangeValue(value)
  }, [])
  return (
    <Card sectioned title="Minimum requirements">
      <Card.Section>
        <Stack vertical alignment="fill">
          <RangeSlider
            output
            label="Money spent is between"
            value={rangeValue}
            prefix={prefix}
            min={min}
            max={max}
            step={step}
            onChange={handleRangeSliderChange}
          />
          <Button size="medium">Submit</Button>
        </Stack>
      </Card.Section>
    </Card>
  )
}
export default FilterByPrice
