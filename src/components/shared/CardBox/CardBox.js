import React from "react";
import { Link } from 'react-router-dom';
import styles from "./CardBox.module.scss";
import PropTypes from "prop-types";
/**
 * Render NotificationList
 * @param {node} children
 
 * @returns node
 */
const CardBox = ({ heading,IconImage,more,url }) => {
  return <div className={`${styles.CardBox}`}>
    <div className={`${styles.iconImage}`}><img src={IconImage} alt="right" /> </div>    
    <h4 className={`${styles.cardHeadig}`}>{heading}</h4>
    <Link className={`${styles.moreBtn}`} to='/#'><img src={more} alt="right" /></Link> 
    {/* <div className={``}>
    <Link className={`${styles.moreBtn}`} to='/#'>{more}</Link>  
    </div>    */}
  </div>;
};

CardBox.propTypes = {
  
  more: PropTypes.string,
  heading: PropTypes.any
};
export default CardBox;
