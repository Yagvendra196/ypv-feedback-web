import React from "react";
import { ListGroup, ListItem, Text, Icon } from "..";
import styles from "./SideBar.module.scss";

const SideBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.p20}>
        <Text variant="lgText" color="primaryColor">
          YPV Spiritual Buddy
        </Text>
      </div>
      <div className={styles.line}></div>
      <div className={styles.p20}>
        <div className={styles.listItem}>
          <ListGroup variant="ul">
            <ListItem>
              <Icon type="dashboard" variant="icon_mlarge" />
              Dashboard
            </ListItem>
            <ListItem>
              <Icon type="password" variant="icon_mlarge" />
              Change Password
            </ListItem>
            <ListItem>
              <Icon type="logout" variant="icon_mlarge" />
              Logout
            </ListItem>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
