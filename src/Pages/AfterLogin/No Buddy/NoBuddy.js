import React from "react";
import styles from "./NoBuddy.module.scss";
import { Icon, Search, Text } from "../../../components/shared";
import { Layout } from "../../../components/containers";
import { useHistory } from "react-router-dom";
const NoBuddy = () => {
   let history = useHistory();
     const goToAddBuddies = () => {
       history.push("add-buddies");
     };
  return (
    <Layout>
      <Search  OnClick={goToAddBuddies}/>
      <div className={styles.buddyWrapper}>
        <Icon type="message" color="disabled" />
        <Text variant="blackColor">No Buddy found</Text>
      </div>
    </Layout>
  );
};

export default NoBuddy;
