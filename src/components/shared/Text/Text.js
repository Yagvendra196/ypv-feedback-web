import React from 'react'
import PropTypes from 'prop-types'
import styles from './Text.module.scss'



 


const Text = ({ 
  variant,
  color,
  children
}) => {
  return (
    <p className={`${styles[variant]} ${styles[color]}`}>{children}</p>
   
    
  )
}


Text.defaultProps = {
  children: 'Hello Text'
}

export default Text;
