import React, { useState } from "react";
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
import DatePicker, { DateObject } from "react-multi-date-picker";
const Buddies = () => {
  let history = useHistory();
  const goTonobuddy = () => {
    history.push("NoBuddy");
  };
  const gotoweeklyfeedback = () => {
    history.push("weekly-feedback");
  };
  const gotomonthlyfeedback = () => {
    history.push("monthly-feedback");
  };

  const [show, setShow] = React.useState(false);
  const [modalshow, setmodalshow] = React.useState(false);
  const [showWeekly, setWeekly] = React.useState(true);
  const [showMonthly, setMonthly] = React.useState(false);
  const WeeklyFeedback = () => {
    setWeekly(true);
    setMonthly(false);
  };
  const MonthlyFeedback = () => {
    setWeekly(false);
    setMonthly(true);
  };
  const [values, setValues] = useState([
    new DateObject().subtract(7, "days"),
    new DateObject().add(7, "days"),
    
  ]);
  const [monthValues, setmonthValues] = useState([
    new DateObject().subtract("date.month.name"),
  ])

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
            clickMod={() => setmodalshow(true)}
            clickFun={() => setShow(true)}
          />
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
            rightIcon="trash"
            clickMod={() => setmodalshow(true)}
            clickFun={() => setShow(true)}
          />
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
            rightIcon="trash"
            clickMod={() => setmodalshow(true)}
            clickFun={() => setShow(true)}
          />
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
            rightIcon="trash"
            clickMod={() => setmodalshow(true)}
            clickFun={() => setShow(true)}
          />
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
            rightIcon="trash"
            clickMod={() => setmodalshow(true)}
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
        <Modal show={modalshow} onClose={() => setmodalshow(false)}>
          <Heading
            headingType="h5"
            headingText="Weekly"
            headingClass={`${styles.tabBtn} ${
              showWeekly ? styles.activeTab : ""
            }`}
            onClick={() => WeeklyFeedback()}
          ></Heading>

          <Heading
            headingType="h5"
            headingText="Monthly"
            headingClass={`${styles.tabBtn} ${
              showMonthly ? styles.activeTab : ""
            }`}
            onClick={() => MonthlyFeedback()}
          ></Heading>
          {showWeekly && (
            <div className={`${styles.weeklyCenter}`}>
              <Heading
                headingType="h5"
                headingText="Weekly Fedback"
                headingClass={`${styles.modalHeading}`}
              ></Heading>
              <DatePicker range value={values} onChange={setValues} />
              <Button
                btnClass={`${styles.modalBtn} ${styles.margin20} ${styles.primery}`}
                btnHandler={gotoweeklyfeedback}
              >
                Go
              </Button>
            </div>
          )}
          {showMonthly && (
            <div className={`${styles.weeklyCenter}`}>
              <Heading
                headingType="h5"
                headingText="Monthly Fedback"
                headingClass={`${styles.modalHeading}`}
              ></Heading>
              <DatePicker
                onlyMonthPicker
                value={monthValues}
                onChange={setmonthValues}
                format="MMMM YYYY"
                sort
              />
              <Button
                btnClass={`${styles.modalBtn} ${styles.margin20} ${styles.primery}`}
                btnHandler={gotomonthlyfeedback}
              >
                Go
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default Buddies;
