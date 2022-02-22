import React from 'react'
import { Link } from 'react-router-dom';
import {Layout} from '../../components/containers';
import {Modal, Heading,Button,Search} from '../../components/shared';
import styles from './HelloWorld.module.scss';

const HelloWorld = (closeBtn,onClose) => {
  const [show, setShow] = React.useState(false);
  const [showWeekly, setWeekly] = React.useState(true);
  const [showMonthly, setMonthly] = React.useState(false);
  const WeeklyFeedback = () => {
    setWeekly(true)
    setMonthly(false)
  }
  const MonthlyFeedback = () => {
    setWeekly(false)
    setMonthly(true)
  }
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

        
            {/* <button onClick={() => setShow(!show)} className={`${styles.btnClose}`}>Close</button> */}
                  {/* <Button btnClass={`${styles.btnClose}`}  btnHandler={() => setShow(!show)} leftIcon="Close"></Button>*/}
                  {/* <button className={`${styles.modalBtn} ${styles.secondary}`} onClick={() => setShow(!show)}>Cancel</button> */}
                  {/* <button className={`${styles.modalBtn} ${styles.primery}`}>Ok</button> */}
              {/* <Modal show={show} onClose={() => setShow(true)}> 
                <div className={`${styles.modalInner}`}>                  
                  <Icon type="close"  customClass={`${styles.btnClose}`} click={() => setShow(!show)}></Icon>                  
                  <Heading headingType='h5' headingText="Are you sure, You want remove to?" headingClass={`${styles.modalHeading}`}></Heading>
                  <Button btnClass={`${styles.modalBtn} ${styles.secondary}`}  btnHandler={() => setShow(!show)}>Cancel</Button>                  
                  <Button btnClass={`${styles.modalBtn} ${styles.primery}`}>Ok</Button>                    
                </div>
              </Modal> */}
            
              <Modal show={show} onClose={() => setShow(false)}>                               
                <Heading headingType='h5' headingText="Weekly" headingClass={`${styles.tabBtn} ${showWeekly ? styles.activeTab : ""}`} onClick={() => WeeklyFeedback()}></Heading>

                <Heading headingType='h5' headingText="Monthly" headingClass={`${styles.tabBtn} ${showMonthly ? styles.activeTab : ""}` } onClick={() => MonthlyFeedback()}></Heading>
                {showWeekly && (
                      <Link className={`${styles.selectBtn}`}>Weekly</Link>
                )}
                {showMonthly && (
                      <Link className={`${styles.selectBtn}`}>Monthly</Link>
                )}
                <Button btnClass={`${styles.modalBtn} ${styles.marginAuto} ${styles.primery}`}>Go</Button>                
              </Modal>
              <Search></Search>
      </Layout>
    </div>
  );
};

export default HelloWorld;
