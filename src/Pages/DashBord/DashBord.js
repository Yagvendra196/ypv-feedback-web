import React from "react";

import styles from "./DashBord.module.scss";
import { User} from '../../assets/img/ImgImport';
import { Eye} from '../../assets/img/ImgImport';
import { Edit} from '../../assets/img/ImgImport';
import { Frame} from '../../assets/img/ImgImport';
// import { ArrowLeft} from '../../assets/img/ImgImport';
import {CardBox} from "../../components/shared";
import {DashBordHeader } from "../../components/shared";

const DashBord = (pros) => {
  return (
    <>
      <div className={`${styles.row}`}>
        <div className={`${styles.dashBord}`}>
          <DashBordHeader />
          <div className={`${styles.row} ${styles.justifyContentCenter}`}>
            <div className={`${styles.colMd}`}>
              <CardBox heading="My Buddies" IconImage={User} more={Frame}/>
            </div>
            <div className={`${styles.colMd}`}>
              <CardBox heading="Give Feedback" IconImage={Edit} more={Frame} />
            </div>
            <div className={`${styles.colMd}`}>
              <CardBox heading="View Feedback" IconImage={Eye} more={Frame} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBord;
