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
        <button className={`${styles.closeBtn}`} onClick={()=>setSideBar(!showSideBar)}>Clik here</button>
        <SideBar customClass={`${styles.overlayBackGround}`} navBarWidth={`${styles.navBarWidth}`}/>
        <div className={`${styles.dashBordBody} ${styles.h100}`}>            
          <div className={`${styles.row} ${styles.stickyMenu} ${styles.justifyContentCenter}`}>
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