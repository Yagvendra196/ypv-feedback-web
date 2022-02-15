import React from "react";
import PropTypes from 'prop-types';
// import {Button} from '../../shared';
import styles from './Tab.module.scss';

const Tab = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  

  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
        <div className={styles.modalContent}>
          <button onClick={onClose} className={`${styles.btnClose}`}>
            Close
          </button>
          {/* <p className={`${styles.modalHeading}`}>{children}</p>
          <button className={`${styles.modalBtn} ${styles.secondary}`} onClick={onClose}>Cansel</button>
          <button className={`${styles.modalBtn} ${styles.primery}`}>Go</button>           */}
          

        </div>
    </div>
  );
};

Tab.propTypes={
  closeBtn:PropTypes.bool,
  onClick:PropTypes.func,
  children:PropTypes.any
}

export default Tab;