import React from 'react'
import PropTypes from 'prop-types'
import styles from './SelectGroup.module.scss'

/**
 * Name: SelectGroup
 * @param {node} children
 * @param {string} variant
 * @param {string} defaultValue
 * @param {func} onChange
 * @param {any} reference
 * @param {any} selectClass
 * 
 * @returns node
 */

const SelectGroup = React.forwardRef(
  ({ name, children, variant,  defaultValue, onChange, selectClass }, ref) => (
    <div className={`${styles.selectWrapper} ${styles[variant]} ${[selectClass]}`}>
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        ref={ref}
        name={name}
      >
        {children}
      </select>
</div>
  )
);


SelectGroup.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  reference:PropTypes.any,
  selectClass:PropTypes.any,
}

export default SelectGroup
