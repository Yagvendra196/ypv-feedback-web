import React from "react";
import styles from "./Buddies.module.scss";
import { Text, Button, ListView } from "../../../components/shared";
import user from "../../../assets/Images/user.png";
const Buddies = () => {
  return (
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
            <Button size="sm" variant="btnPrimary" leftIcon="dashboard">
              Add Buddy
            </Button>
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
        />
        <ListView
          leftImage={user}
          topHeading="David Yogi"
          mapIcon="map"
          mapText="Indore, M.P."
          rightIcon="trash"
        />
        <ListView
          leftImage={user}
          topHeading="David Yogi"
          mapIcon="map"
          mapText="Indore, M.P."
          rightIcon="trash"
        />
        <ListView
          leftImage={user}
          topHeading="David Yogi"
          mapIcon="map"
          mapText="Indore, M.P."
          rightIcon="trash"
        />
        <ListView
          leftImage={user}
          topHeading="David Yogi"
          mapIcon="map"
          mapText="Indore, M.P."
          rightIcon="trash"
        />
        <ListView
          leftImage={user}
          topHeading="David Yogi"
          mapIcon="map"
          mapText="Indore, M.P."
          rightIcon="trash"
        />
      </div>
    </div>
  );
};

export default Buddies;
