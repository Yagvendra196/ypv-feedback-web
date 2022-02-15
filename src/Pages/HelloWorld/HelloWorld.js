import React,{useState} from 'react'
import {Layout} from '../../components/containers';
import {Modal, TabBox, ModalBox, DashBord} from '../../components/shared';
import styles from './HelloWorld.module.scss';

const HelloWorld = (closeBtn,onClose) => {
  const [show, setShow] = React.useState(false);
  // if (!show) {
  //     return null;
  //   }
  return (
    <div className="App">
      <Layout>
        {/* <DashBord /> */}
        {/* <ModalBox /> */}
        <button className={`${styles.modalBtn}`} onClick={() => setShow(true)}>
          Modal
        </button>

        {/* <Modal show={show} onClose={() => setShow(true)}>
          <div className={`${styles.modalInner}`}>
            <button
              onClick={() => setShow(!show)}
              className={`${styles.btnClose}`}
            >
              Close
            </button>
            <p className={`${styles.modalHeading}`}>
              Are you sure, You want remove to?
            </p>
            <button
              className={`${styles.modalBtn} ${styles.secondary}`}
              onClick={() => setShow(!show)}
            >
              Cancel
            </button>
            <button className={`${styles.modalBtn} ${styles.primery}`}>
              Ok
            </button>
          </div>
        </Modal> */}

        {/* <Modal show={show} onClose={() => setShow(true)}> 
          <h5 className={`${styles.tabBtn} ${styles.activeTab}`}>Weekly</h5>
          <h5 className={`${styles.tabBtn}`}>Monthly</h5>
          <a className={`${styles.selectBtn}`}>Select picker</a> 
          <button className={`${styles.modalBtn} ${styles.primery} ${styles.marginAuto}`}>Go</button>         
        </Modal> */}
      </Layout>
    </div>
  );
};

export default HelloWorld;
