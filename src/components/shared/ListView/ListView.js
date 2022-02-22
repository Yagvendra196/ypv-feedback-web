import React from "react";
import PropTypes from "prop-types";
import styles from "./ListView.module.scss";
import { Button, Heading, Icon, Image, Text } from "..";

/**
 * Name: Text
 * Desc: Render text
 * @param {any} children,
 * @param {string} rightIcon
 * @param {string} rightButton
 * @param {string} mapIcon
 * @param {string} topHeading
 * @param {string} mapText
 */

const ListView = ({
  children,
  rightIcon,
  rightButton,
  leftImage,
  topHeading,
  mapIcon,
  mapText,
}) => {
  return (
    <div className={styles.listWrapper}>
      {leftImage && <Image src={leftImage} customClass={styles.leftImage} />}
      <div className={styles.mainWrepper}>
        {topHeading && (
          <Heading headingText={topHeading} customClass={styles.topHeading} />
        )}
        <div className={`${styles.mapWrepper} ${styles.mt10}`}>
          {mapIcon && <Icon type={mapIcon} customClass={styles.mapIcon} />}
          <div className={styles.mapText}>
            {mapText && (
              <Text
                children={mapText}
                variant="smText"
                color="SecondaryColor"
                customClass={styles.mapText}
              />
            )}
          </div>
        </div>
      </div>
      {children}
      {rightIcon && <Icon type={rightIcon} customClass={styles.rightIcon} />}
      {rightButton && (
        <Button
          children={rightButton}
          customClass={styles.rightButton}
          variant="btnPrimary"
          size="sm"
          btnClass={styles.rightButton}
        />
      )}
    </div>
  );
};
ListView.propTypes = {
  children: PropTypes.any,
  topHeading: PropTypes.string,
  mapText: PropTypes.string,
  rightIcon: PropTypes.string,
  rightButton: PropTypes.string,
  mapIcon: PropTypes.string,
  leftImage: PropTypes.string,
};

export default ListView;