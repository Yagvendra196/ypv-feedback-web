import React from "react";
import { Layout } from "../../../components/containers";
import styles from "./ViewFeedback.module.scss";
import {ListView} from "../../../components/shared";
import user from "../../../assets/Images/user.png";
const ViewFeedback= () =>{
    return (
      <Layout>
        <div className={styles.ViewWrapper}>
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
          />
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
          />{" "}
          <ListView
            leftImage={user}
            topHeading="David Yogi"
            mapIcon="map"
            mapText="Indore, M.P."
          />
        </div>
      </Layout>
    );
}
export default ViewFeedback;