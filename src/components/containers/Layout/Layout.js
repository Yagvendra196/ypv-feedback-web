import React from 'react';
import PropTypes from "prop-types";
import styles from "./Layout.module.scss"
import { Header, SideBar } from '../../shared';

/**
 * Name: Text
 * Desc: Render text
 * @param {any} children,
 */


const Layout = ({children}) => {
  return (
    <div className={`${styles.row}`}>
      <SideBar />

      <div className={`${styles.dashBordBody} ${styles.h100}`}>
        <div className={`${styles.row} ${styles.justifyContentCenter}`}>
          <Header />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};


Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;