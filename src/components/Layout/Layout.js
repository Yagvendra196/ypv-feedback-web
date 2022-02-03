import React from "react";

import styles from "./Layout.module.scss";
// import { User} from '../../assets/img/ImgImport';
// import { Eye} from '../../assets/img/ImgImport';
// import { Edit} from '../../assets/img/ImgImport';
// import { Frame} from '../../assets/img/ImgImport';
// import { ArrowLeft} from '../../assets/img/ImgImport';
// import {CardBox} from "../../components/shared";
import {DashBordHeader } from "../../components/shared";
import { Sidenav } from '../../components/shared';
const Layout = () => {
  return (
    <>
    
      <div className={`${styles.row}`}>
      <Sidenav/>
        <div className={`${styles.dashBordBody} ${styles.h100}`}>   
          
          <div className={`${styles.row} ${styles.justifyContentCenter}`}>
            <DashBordHeader />
            {/* <div className={`${styles.cardBody}`}>
              <CardBox heading="My Buddies" IconImage={User} more={Frame}/>            
              <CardBox heading="Give Feedback" IconImage={Edit} more={Frame} />            
              <CardBox heading="View Feedback" IconImage={Eye} more={Frame} />
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
