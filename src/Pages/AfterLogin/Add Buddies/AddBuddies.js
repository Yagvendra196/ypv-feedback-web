import React from "react";
import styles from "./addBuddies.module.scss";
import { Icon, Text } from "../../../components/shared";
import { Layout } from "../../../components/containers";
const AddBuddies = () =>{
    return (
      <Layout>
        <div className={styles.addWrapper}>
          <Icon type="message" />
          <Text variant="SecondaryColor">No Buddy found</Text>
        </div>
      </Layout>
    );
}

export default AddBuddies;