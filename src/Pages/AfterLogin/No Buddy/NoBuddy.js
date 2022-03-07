import React from "react";
import styles from "./NoBuddy.module.scss";
import { Icon, Search, Text } from "../../../components/shared";
import { Layout } from "../../../components/containers";
const NoBuddy = () => {
  return (
    <Layout>
      <Search />
      <div className={styles.buddyWrapper}>
        <Icon type="message" color="disabled" />
        <Text variant="blackColor">No Buddy found</Text>
      </div>
    </Layout>
  );
};

export default NoBuddy;