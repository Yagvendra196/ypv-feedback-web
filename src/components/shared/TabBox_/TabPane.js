import React from "react";
// import PropTypes from 'prop-types';
import styles from './Tab.module.scss';

const TabPane = (props) => {
  return <div className={styles.tabPane}>{props.childern}</div>;
};
// TabPane.propTypes = {
//   name: PropTypes.string
// };

export default TabPane;
