import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'
import { Icon } from '..';


/** Render Button
 * 
 * @param {string} variant
 * @param {string} type
 * @param {string} size
 * @param {bool} block
 * @param {bool} disabled
 * @param {func} btnHandler
 * @param {string} leftIcon
 * @param {any} children
 * @returns node
 */
 


const Button = ({
  type,
  variant,
  size,
  block,
  disabled,
  btnHandler,
  color,
  leftIcon,
  children,
  btnClass,
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${[btnClass]} ${styles[size]} ${styles[color]} ${
        block ? styles.block : ''
      }`}
      disabled={disabled}
      onClick={btnHandler}
    >
      {leftIcon && <Icon type={leftIcon} customClass={styles.leftIcon} />}
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  btnHandler: PropTypes.func,
  leftIcon: PropTypes.string,
  children: PropTypes.any,
  
};

Button.defaultProps = {
  variant: "",
  size: "",
  block: false,
  disabled: false,
  children: 'Button Title'
}

export default Button;
