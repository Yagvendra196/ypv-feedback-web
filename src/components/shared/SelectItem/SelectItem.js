import React from 'react'
import PropTypes from 'prop-types'

/**
 * Name: SelectItem
 * @param {any} children
 * @param {any} value
 * @returns node
 */

const SelectItem = ({ children, value }) => {
  return (
    <option value={value}>
      {children}
    </option>
  )
}

SelectItem.propTypes = {
  children: PropTypes.any,
  value: PropTypes.any
}

export default SelectItem
