import React from "react";
import styles from "./CardBox.module.scss";
import PropTypes from "prop-types";
/**
 * Render NotificationList
 * @param {node} children
 
 * @returns node
 */
const CardBox = ({
    heading,
    IconImage,
    more,
    onClick,
    onClose,
  }) => {
  return <div className={`${styles.CardBox}`}>
    <div className={`${styles.iconImage}`}><img src={IconImage} alt="right" /> </div>    
    <h4 className={`${styles.cardHeadig}`}>{heading}</h4>
    <div onClick={onClose} className={`${styles.moreBtn}`} onClick={onClick}><img src={more} alt="right" /></div> 
    
  </div>;
};

CardBox.propTypes = {
  more: PropTypes.string,
  onClick: PropTypes.func,
  heading: PropTypes.any
};
export default CardBox;
