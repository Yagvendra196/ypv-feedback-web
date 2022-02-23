import React from 'react';
import PropTypes from "prop-types";
import styles from "./Layout.module.scss"
import { Header, SideBar} from '../../shared';

/**
 * Name: Text
 * Desc: Render text
 * @param {any} children,
 */


const Layout = ({children}) => {
  const [showSideBar, setSideBar] = React.useState(false);
  return (
    <div className={`${styles.row} ${showSideBar ? styles.activeMenu : ""}`}>
      <SideBar />
      <div className={`${styles.dashBordBody} ${styles.h100}`}>
        <div className={`${styles.row} ${styles.justifyContentCenter}`}>
          <Header MenuToggle={()=>setSideBar(!showSideBar)}  />
        </div>
        {children}
      </div>
    </div>
  );
};


Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;