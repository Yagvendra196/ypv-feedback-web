import React from "react";
import styles from "./Header.module.scss";
import { ArrowLeft} from '../../../assets/img/ImgImport';

/**
 * Render NotificationList
 * @param {node} children
 
 * @returns node
 */
const Header = ({ heading,IconImage,more,url }) => {
  return  <div className={`${styles.dashBordHeaer}`}>
          <h3><img className={`${styles.ArrowLeft}`} src={ArrowLeft} alt="right" />Dashbord</h3>
          </div>
};


export default Header;
