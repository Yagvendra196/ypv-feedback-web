import React from "react";
import styles from "./addBuddies.module.scss";
// import { Icon, Text } from "../../../components/shared";
import { Layout } from "../../../components/containers";
import {  ListView } from "../../../components/shared";
import user from "../../../assets/Images/user.png";
import { useHistory } from "react-router-dom";
const AddBuddies = () =>{
   let history = useHistory()
  const goTonobuddy = () => {
    history.push('NoBuddy')
  }
    return (
      <Layout>
        <div>
          <div className={styles.listWrapper}>
            <ListView
              leftImage={user}
              topHeading="David Yogi"
              mapIcon="map"
              mapText="Indore, M.P."
              rightButton="Add"
              clickFun={goTonobuddy}
            />
            <ListView
              leftImage={user}
              topHeading="David Yogi"
              mapIcon="map"
              mapText="Indore, M.P."
              rightButton="Add"
              clickFun={goTonobuddy}
            />
            <ListView
              leftImage={user}
              topHeading="David Yogi"
              mapIcon="map"
              mapText="Indore, M.P."
              rightButton="Add"
              clickFun={goTonobuddy}
            />
            <ListView
              leftImage={user}
              topHeading="David Yogi"
              mapIcon="map"
              mapText="Indore, M.P."
              rightButton="Add"
              clickFun={goTonobuddy}
            />
            <ListView
              leftImage={user}
              topHeading="David Yogi"
              mapIcon="map"
              mapText="Indore, M.P."
              rightButton="Add"
              clickFun={goTonobuddy}
            />
            <ListView
              leftImage={user}
              topHeading="David Yogi"
              mapIcon="map"
              mapText="Indore, M.P."
              rightButton="Add"
              clickFun={goTonobuddy}
            />
          </div>
        </div>
      </Layout>
    );
}

export default AddBuddies;