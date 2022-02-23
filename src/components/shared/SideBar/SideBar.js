import React from "react";
import { ListGroup, ListItem, Text, Icon } from "..";
import styles from "./SideBar.module.scss";
import { useHistory } from "react-router-dom";

const SideBar = (onClose) => {
  const [show, setShow] = React.useState(false);
  
  return (
    <div className={`${styles.SideBarOverlay}`} onClick={onClose}>
      <div className={styles.navBar} onClose={() => setShow(true)}>
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
    </div>  
  );
};

export default SideBar;
