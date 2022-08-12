import { ChoiceList } from '@shopify/polaris'
import React from 'react'

const FilterBySort = (props) => {
  const { onChange, choices } = props
  console.log('choices :>> ', choices)
  return (
    <ChoiceList
      title="Sort"
      //   choices={choices.map((choice) => choice.val )}
      //   selected={selected}
      onChange={onChange}
    />
  )
}
export default FilterBySort
