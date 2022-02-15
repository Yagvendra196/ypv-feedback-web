import React from "react";
import PropTypes from 'prop-types';
import {Button} from '../../shared';
import styles from './Modal.module.scss';

const Modal = ({ show, onClose, children, closeBtn }) => {
    if (!show) {
      return null;
    }

  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
        <div className={styles.modalContent}>
          {/* {closeBtn && (
              <button onClick={onClose} className={`${styles.btnClose}`}>
              Close
            </button>
          )} */}
          
           {/* <p className={`${styles.modalHeading}`}>Are you sure, You want remove to?</p>
            <button className={`${styles.modalBtn} ${styles.secondary}`} onClick={onClose}>Cancel</button>
            <button className={`${styles.modalBtn} ${styles.primery}`}>Ok</button> */}
          {children}
        </div>
    </div>
  );
};

Modal.propTypes={
  closeBtn:PropTypes.bool,
  onClick:PropTypes.func,
  children:PropTypes.any
}

export default Modal;