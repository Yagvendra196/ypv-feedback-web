import React from 'react'
import PropTypes from 'prop-types'
import styles from './ListGroup.module.scss'

/**
 * Render ListGroup
 * @param {node} children
 * @param {string} variant
 * @param {string} customClass
 * @returns node
 */

const ListGroup = ({
    children,
    variant,
    customClass
  }) => {
  return (
    <ul className={`${styles[variant]} ${[customClass]}`}>
      {children}
    </ul>
  )
}

ListGroup.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  customClass: PropTypes.string
}

export default ListGroup
