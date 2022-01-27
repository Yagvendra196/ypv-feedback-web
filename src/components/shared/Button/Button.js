import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'


/** Render Button
 * @param {string} variant
 * @param {string} btnType
 * @param {string} size
 * @param {bool} block
 * @param {bool} disabled
 * @param {func} btnHandler
 * @param {any} children
 * @returns node
 */
 


const Button = ({
  Type,
  variant,
  size,
  block,
  disabled,
  btnHandler,
  children
}) => {
  return (
    <button
      type={Type}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        block ? styles.block : ''
      }`}
      disabled={disabled}
      onClick={btnHandler}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  btnType: PropTypes.string,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  btnHandler: PropTypes.func,
  children: PropTypes.any
}

Button.defaultProps = {
  variant: "btnPrimary",
  size: "md",
  block: false,
  disabled: false,
  children: 'Button Title'
}

export default Button;