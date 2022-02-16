import React,{useState} from 'react'
import {Layout} from '../../components/containers';
import {Modal, TabBox, ModalBox, DashBord,Heading, Button, Icon} from '../../components/shared';
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
            
            <Modal show={show} onClose={() => setShow(true)}> 
            <div className={`${styles.modalInner}`}>
              {/* <button onClick={() => setShow(!show)} className={`${styles.btnClose}`}>
                    Close
                  </button> */}

                {/* <Button btnClass={`${styles.btnClose}`}  btnHandler={() => setShow(!show)} leftIcon="Close"></Button>       */}

                <Icon type="close"  customClass={`${styles.btnClose}`} clickFun={() => setShow(!show)}></Icon>
                
                <Heading headingType='h5' headingText="Are you sure, You want remove to?" headingClass={`${styles.modalHeading}`}></Heading>
                <Button btnClass={`${styles.modalBtn} ${styles.secondary}`}  btnHandler={() => setShow(!show)}>Cancel</Button>
                  {/* <button className={`${styles.modalBtn} ${styles.secondary}`} onClick={() => setShow(!show)}>Cancel</button> */}
                  {/* <button className={`${styles.modalBtn} ${styles.primery}`}>Ok</button> */}
                  <Button btnClass={`${styles.modalBtn} ${styles.primery}`}>Ok</Button>
                  
              </div>
            </Modal>
            

        
      </Layout>
      
      
       


    </div>
  );
};

export default HelloWorld;
