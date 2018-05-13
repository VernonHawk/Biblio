import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    width:   PropTypes.number,
    height:  PropTypes.number,
    viewBox: PropTypes.string,
    path:    PropTypes.string.isRequired
};

const defaultProps = {
    width:   20,
    height:  20,
    viewBox: "0 0 1024 1024"
};

function Svg({ width, height, viewBox, path, ...rest }) {
    return (
        <svg width={width} height={height} viewBox={viewBox} {...rest}>
            <path d={path}></path>
        </svg>
    );
}

Svg.propTypes = propTypes;
Svg.defaultProps = defaultProps;

export default Svg;