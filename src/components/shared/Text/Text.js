import React from 'react'
import PropTypes from 'prop-types'
import styles from './Text.module.scss'



 


const Text = ({ variant, color, children, textHandler }) => {
  return (
    <span
      className={`${styles[variant]} ${styles[color]}`}
      onClick={textHandler}
    >
      {children}
    </span>
  );
};


Text.defaultProps = {
  children: 'Hello Text',
  textHandler: PropTypes.func,
}

export default Text;
