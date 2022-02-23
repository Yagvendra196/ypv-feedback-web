import React from "react";
import styles from "./Header.module.scss";
import {Heading, Icon} from '../../shared';
import { ArrowLeft} from '../../../assets/img/ImgImport';
import PropTypes from "prop-types";
/**
 * Render NotificationList
 * @param {node} children
 
 * @returns node
 */
const Header = ({ heading,IconImage,more,url }) => {
  return  <div className={`${styles.dashBordHeader}`}>  
    <Icon type="leftArrow"  customClass={`${styles.burgerMenu}`} ></Icon>
    <Icon type="leftArrow"  customClass={`${styles.arrowLeft}`}></Icon>
    <Heading headingType='h2' headingText="DashBoard" headingClass={`${styles.headerHeaing}`} />
               
          </div>
};


export default Header;
