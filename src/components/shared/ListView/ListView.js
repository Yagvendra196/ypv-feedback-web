import React from 'react';
import PropTypes from "prop-types";
import styles from "./ListView.module.scss";
import { Heading, Icon } from '..';
import user from "../../../assets/Images/user.png";

/**
 * Name: Text
 * Desc: Render text
 * @param {any} children,
 * @param {string} headingText,
 */

const ListView = ({ children, headingText }) => {
  return (
    <div className={styles.listWrapper}>
      <div className={styles.userWrepper}>
        <img src={user} />
      </div>

      <div className={styles.mainWrepper}>
        <Heading headingText="Spiritual Buddy Login" type="h5" />
        <div className={`${styles.mapWrepper} ${styles.mt10}`}>
          <Icon type="map" />
          <div className={styles.mapText}>
            <Heading headingText="Spiritual" fontColor="grey" type="h5">
              {headingText}
            </Heading>
          </div>
        </div>
      </div>
      <div className={styles.removeIcon}>
        <Icon type="trash" color="disabledText" />
      </div>
    </div>
  );
};
ListView.propTypes = {
  children: PropTypes.any,
   headingText: PropTypes.node,
};

export default ListView;