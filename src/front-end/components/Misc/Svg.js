import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    width:   PropTypes.number.isRequired,
    height:  PropTypes.number.isRequired,
    viewBox: PropTypes.string.isRequired,
    path:    PropTypes.string.isRequired
};

function Svg({ width, height, viewBox, path, ...rest }) {
    return (
        <svg width={width} height={height} viewBox={viewBox} {...rest}>
            <path d={path}></path>
        </svg>
    );
}

Svg.propTypes = propTypes;

export default Svg;