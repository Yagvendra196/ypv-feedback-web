import React  from "react";
import styles from "./Buddies.module.scss";
import {
  Text,
  Button,
  ListView,
  Modal,
  Icon,
  Heading,
} from "../../../components/shared";
import user from "../../../assets/Images/user.png";
import { Layout } from "../../../components/containers";
import { useHistory } from "react-router-dom";
const Buddies = () => {
  let history = useHistory();
  const goTonobuddy = () => {
    history.push("NoBuddy");
  };
  
   const [show, setShow] = React.useState(false);
   
  
  return (
    <Layout>
      <div className={styles.Wrapper}>
        <div className={styles.buddiesWrapper}>
          <div className={styles.buddiesHeader}>
            <div className={styles.textHead}>
              <Text variant="mdText" color="SecondaryColor">
                Select one or more AYs from the list as your buddies to whom you
                are monitoring.
              </Text>
            </div>
            <div className={styles.buddiesRight}>
              <Button
                size="sm"
                variant="btnPrimary"
                leftIcon="plus"
                children="Add Buddy"
                btnHandler={goTonobuddy}
              />
            </div>
          </div>
        </div>
        <div className={styles.listWrapper}>
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
            rightIcon="trash"
            
            clickFun={() => setShow(true)}
          />
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
            rightIcon="trash"
            clickFun={() => setShow(true)}
          />
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
            rightIcon="trash"
            clickFun={() => setShow(true)}
          />
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
            rightIcon="trash"
            clickFun={() => setShow(true)}
          />
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
            rightIcon="trash"
            clickFun={() => setShow(true)}
          />
        </div>
        <Modal show={show} onClose={() => setShow(true)}>
          <div className={`${styles.modalInner}`}>
            <Icon
              type="close"
              customClass={`${styles.btnClose}`}
              click={() => setShow(!show)}
            ></Icon>
            <Heading
              headingType="h5"
              headingText="Are you sure, You want remove to?"
              headingClass={`${styles.modalHeading}`}
            ></Heading>
            <Button
              btnClass={`${styles.modalBtn} ${styles.secondary}`}
              btnHandler={() => setShow(!show)}
            >
              Cancel
            </Button>
            <Button btnClass={`${styles.modalBtn} ${styles.primery}`}>
              Ok
            </Button>
          </div>
        </Modal>
       
      </div>
    </Layout>
  );
};

export default Buddies;
