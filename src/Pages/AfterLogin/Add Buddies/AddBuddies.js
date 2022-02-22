import React from "react";
import styles from "./addBuddies.module.scss";
import { Icon, Text } from "../../../components/shared";
const AddBuddies = () =>{
    return (
      <div className={styles.addWrapper}>
        <Icon type="message" />
        <Text variant="SecondaryColor">No Buddy found</Text>
      </div>
    );
}

export default AddBuddies;