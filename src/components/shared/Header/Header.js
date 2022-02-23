import React from "react";
import styles from "./Header.module.scss";
import {Heading, Icon} from '../../shared';


/**
 * Render NotificationList
 * @param {node} children
 
 * @returns node
 */
const Header = ({MenuToggle }) => {
  return  <div className={`${styles.dashBordHeader}`}>  
    <Icon type="Menu"  customClass={`${styles.burgerMenu}`} click={MenuToggle}></Icon>
    <Icon type="leftArrow"  customClass={`${styles.arrowLeft}`}></Icon>
    <Heading headingType='h2' headingText="DashBoard" headingClass={`${styles.headerHeaing}`} />
               
          </div>
};


export default Header;
