import React from "react";
import PropTypes from "prop-types";

/**
 * Render Image Tag
 * @param {isRequired} src
 * @param {string} className
 * @param {string} alt
 * @param {string} height
 * @param {string} width
 * @returns node
 */
const Image = ({ className, src, alt, height, width }) => {
    return <img className = { className }
    src = { src }
    alt = { alt }
    draggable = "false"
    height = { height }
    width = { width }
    />;
};

Image.defaultProps = {
    alt: "Image",
};
Image.propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    alt: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string
};

export default Image;