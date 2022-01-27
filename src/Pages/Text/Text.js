import React from 'react'
import PropTypes from 'prop-types'
import styles from './Text.module.scss'

/**
 * Name: Text
 * Desc: Render text
 * @param {node} children
 * @param {string} color
 * @param {isRequired} text
 * @param {string} strong
 * @param {bool}   lineThrough
 * @param {string} upperCase
 * @param {string} variant
 * @param {string} textClass
 * @param {func} handleClick
 */

const Text = ({
  children,
  color,
  text,
  strong,
  lineThrough,
  upperCase,
  variant,
  textClass,
  handleClick
}) => {
  const finalText = children || text
  const fontColor = color ? styles[color] : ''
  const fontWeight = strong ? styles[strong] : ''
  const strikeThrough = lineThrough ? styles[lineThrough] : ''
  const textTransform = upperCase ? styles[upperCase] : ''
  const stylingClass = textClass
    ? styles[textClass]
      ? styles[textClass]
      : textClass
    : ''
  return (
    <span
      className={`${styles[variant]} ${fontColor} ${fontWeight} ${strikeThrough} ${textTransform} ${stylingClass}`.trimRight()}
      onClick={handleClick}

    >
      {finalText}
    </span>
  )
}

// Default Props
Text.defaultProps = {
  variant: 'lgText',
  text: '',
  textClass: ''
}

// PropTypes Validation
Text.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired,
  strong: PropTypes.string,
  lineThrough: PropTypes.bool,
  upperCase: PropTypes.string,
  variant: PropTypes.string,
  textClass: PropTypes.string,
  handleClick: PropTypes.func
}

export default Text
