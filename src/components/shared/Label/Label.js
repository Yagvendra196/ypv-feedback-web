import React from 'react'
import PropTypes from 'prop-types'

/**
 * Render Label
 * @param {string} labelClass
 * @param {string} htmlfor
 * @param {node} children
 * @param {string} dataValue
 * @param {fun} onClick
 * @returns node
 */

const Label = ({
  labelClass,
  htmlfor,
  children,
  dataValue,
  onClick
}) => {
  return (
    <label data-value={dataValue} onClick={onClick} className={labelClass} htmlFor={htmlfor}>{children}</label>
  )
}

Label.propTypes = {
  labelClass: PropTypes.string,
  htmlfor: PropTypes.string,
  children: PropTypes.node,
  dataValue: PropTypes.string,
  onClick: PropTypes.func
}

export default Label
