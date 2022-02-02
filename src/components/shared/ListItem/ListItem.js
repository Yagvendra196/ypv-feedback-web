import React from 'react'
import PropTypes from 'prop-types'
import styles from './ListItem.module.scss'

/**
 * Render ListItem
 * @param {any} children
 * @param {string} variant
 * @param {func} handleClick
 * @param {string} listClass
 * @returns node
 */

const ListItem = ({
    children,
    variant,
    handleClick,
    listClass
  }) => {
  return (
    <li
      className={`${styles[variant] ? styles[variant] : ''} ${[listClass]}`}
      onClick={handleClick}
    >
      {children}
    </li>
  )}

ListItem.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.string,
  handleClick: PropTypes.func,
  listClass: PropTypes.string,
}

export default ListItem
