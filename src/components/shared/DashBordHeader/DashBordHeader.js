import React from "react";
import { Link } from 'react-router-dom';
import styles from "./DashBordHeader.module.scss";
import { ArrowLeft} from '../../../assets/img/ImgImport';
import PropTypes from "prop-types";
/**
 * Render NotificationList
 * @param {node} children
 
 * @returns node
 */
const DashBordHeader = ({ heading,IconImage,more,url }) => {
  return  <div className={`${styles.dashBordHeaer}`}>
          <h3><img className={`${styles.ArrowLeft}`} src={ArrowLeft} alt="right" />Dashbord</h3>
          </div>
};


export default DashBordHeader;
