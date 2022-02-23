import React from "react";
import { ListGroup, ListItem, Text, Icon } from "..";
import styles from "./SideBar.module.scss";
import { useHistory } from "react-router-dom";
const SideBar = () => {
   let history = useHistory();
   const goTodashboard = () => {
     history.push("dashboard");
   };
   const goTochangepassword = () => {
     history.push("changepassword");
   };
   const goTologin = () => {
     history.push("/");
   };
  
  // const [show, setShow] = React.useState(false);
  
  return (
    
    <div className={`${styles.SideBarOverlay}`} >
      <div className={styles.navBar} >
        <div className={styles.p20}>
          <Text variant="lgText" color="primaryColor">
            YPV Spiritual Buddy
          </Text>
        </div>
        <div className={styles.line}></div>
        <div className={styles.p20}>
          <div className={styles.listItem}>
            <ListGroup variant="ul">
              <ListItem handleClick={goTodashboard}>
                <Icon type="dashboard" variant="icon_mlarge" />
                Dashboard
              </ListItem>
              <ListItem handleClick={goTochangepassword}>
                <Icon type="password" variant="icon_mlarge" />
                Change Password
              </ListItem>
              <ListItem handleClick={goTologin}>
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
