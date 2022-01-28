import React from 'react'
import PropTypes from 'prop-types'
import styles from './Text.module.scss'



 


const Text = ({ 
  variant,
  color,
  children
}) => {
  return (
    <span className={`${styles[variant]} ${styles[color]}`}>{children}</span>
   
    
  )
}


Text.defaultProps = {
  children: 'Hello Text'
}

export default Text;
