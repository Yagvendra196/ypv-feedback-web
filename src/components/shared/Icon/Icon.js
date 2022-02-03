import React from "react";
import PropTypes from "prop-types";
import { ICONTYPES } from "./constant";
import styles from "./Icon.module.scss";

/**
 * Render Icon
 * @param {isRequired} type
 * @param {bool} disabled
 * @param {string} color
 * @param {string} customClass
 * @param {fun} click
 * @param {string} title
 * @param {string} active
 * @param {string} variant
 */

const returnIconClass = (props) => {
  let iconClass = "";
  if (ICONTYPES[props.type] !== undefined) {
    iconClass = ICONTYPES[props.type].iconClass;
  }
  if (props.active) {
    iconClass += " " + props.active;
  }
  return iconClass;
};

const returnIconTitle = (props) => {
  let iconTitle = "";
  if (props.title) {
    iconTitle = props.title;
  } else if (ICONTYPES[props.type] !== undefined) {
    iconTitle += " " + ICONTYPES[props.type].iconTitle;
  }
  return iconTitle;
};

const Icon = (props) => {
  const clickFun = props.click && ((e) => props.click(e));
  return (
    <i
      className={`${returnIconClass(props)} ${
        props.color ? styles[props.color] : ""
      } ${[props.customClass]} ${styles[props.variant]}`}
      onClick={clickFun}
      title={returnIconTitle(props)}
    ></i>
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  customClass: PropTypes.string,
  click: PropTypes.func,
  title: PropTypes.string,
  active: PropTypes.string,
  variant: PropTypes.string,
};

Icon.defaultProps = {
  disabled: false,
  type: ICONTYPES.profile,
  color: "",
};

export default Icon;
