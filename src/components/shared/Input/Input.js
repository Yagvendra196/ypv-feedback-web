import React from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'
/**
 * Render Input
 * @param {string} variant
 * @param {string} inputClass
 * @param {string} name
 * @param {string} placeholder
 * @param {any} value
 * @param {func} onChange
 * @param {bool} defaultChecked
 * @param {isRequired} type
 * @param {string} inputId
 * @param {string} disabled
 * @param {number} inputLength
 * @param {func} onInput
 * @returns node
 */

const Input = ({
  variant,
  inputClass,
  name,
  placeholder,
  value,
  onChange,
  defaultChecked,
  type,
  inputId,
  disabled,
  reference,
  inputMaxLength,
  onInput
}) => {
  switch (type) {
    case 'textarea':
      return (
        <textarea
          disabled={disabled}
          id={inputId}
          className={`${styles[variant]} ${styles.input} ${[inputClass]}`}
          name={name}
          placeholder={placeholder}
        >
          {value}
        </textarea>
      )

    default:
      return (
        <input
          type={type}
          id={inputId}
          className={`${styles[variant]} ${styles.input} ${[inputClass]}`}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={value}
          defaultChecked={defaultChecked}
          ref={reference}
          maxLength={inputMaxLength}
          onInput={onInput}
        />
      )
  }
}

Input.defaultProps = {
  type: Text
}

Input.propTypes = {
  inputClass: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  type: PropTypes.string.isRequired,
  inputId: PropTypes.string,
  disabled: PropTypes.string,
  inputMaxLength: PropTypes.number,
  reference:PropTypes.any,
  onInput:PropTypes.func
}

export default Input
