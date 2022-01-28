import React from 'react'
import PropTypes from 'prop-types'
import styles from './Heading.module.scss'
/**
 * Render Heading
 * @param {string} variant
 * @param {string} headingType
 * @param {string} headingText
 * @param {string} color
 * @param {isRequired} type
 * @param {string} lineThrough
 * @param {string} fontWeight
 * @param {string} headingClass

 */

const renderHeading = ({
  variant,
  type,
  headingText,
  headingClass,
  color, 
  lineThrough, 
  fontWeight,
  onClick
}) => {
  const fontColor = color ? styles[color] : ''
  const strikeThrough = lineThrough ? styles[lineThrough] : ''
  const textVariant = fontWeight ? styles[fontWeight] : ''
  switch (type) {
    case 'h1': {
      return <h1  onClick={onClick} className={`${styles[variant]} ${[headingClass]} ${fontColor} ${textVariant} ${strikeThrough} `}>{headingText}</h1>
    }
    case 'h2': {
      return <h2  onClick={onClick}  className={`${styles[variant]} ${[headingClass]} ${fontColor} ${textVariant} ${strikeThrough}`}>{headingText}</h2>
    }
    case 'h3': {
      return <h3  onClick={onClick}  className={`${styles[variant]}${[headingClass]} ${fontColor} ${textVariant} ${strikeThrough}`}>{headingText}</h3>
    }
    case 'h4': {
      return <h4 onClick={onClick} className={`${styles[variant]} ${[headingClass]} ${fontColor} ${textVariant} ${strikeThrough}`}>{headingText}</h4>
    }
    case 'h5': {
      return <h5 onClick={onClick}  className={`${styles[variant]} ${[headingClass]} ${fontColor} ${textVariant} ${strikeThrough}`}>{headingText}</h5>
    }
    case 'h6': {
      return <h6 onClick={onClick}  className={`${styles[variant]} ${[headingClass]} ${fontColor} ${textVariant} ${strikeThrough}`}>{headingText}</h6>
    }
    default: {
      return <h5 onClick={onClick}  className={`${styles[variant]} ${[headingClass]} ${fontColor} ${textVariant} ${strikeThrough}`}>{headingText}</h5>
    }
  }
}

const Heading = (props) => {
  return (
    renderHeading(props)
  )
}

Heading.defaultProps = {
  type: Text
}

Heading.propTypes = {
  headingType: PropTypes.string,
  headingText: PropTypes.node,
  headingClass: PropTypes.string,
  color: PropTypes.string,
  lineThrough: PropTypes.string,
  fontWeight: PropTypes.string,
  onClick:PropTypes.func
}

export default Heading
