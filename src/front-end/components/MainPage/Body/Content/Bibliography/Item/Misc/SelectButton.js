import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

import Svg from "components/Misc/Svg";

import "./SelectButton.css";

import { check } from "media/icons.json";

const propTypes = {
    isSelected: PropTypes.bool.isRequired
};

function SelectButton({ isSelected, ...rest }) {
    let className = "button_select";

    if (isSelected) {
        className += " button_select--selected";
    }

    const checkIcon = {
        width: 14,
        height: 14,
        path: check
    };

    return (
        <Button 
            outline color="primary" 
            className={ className } 
            {...rest}
        >
            { isSelected && <Svg {...checkIcon} style={{ fill: "white" }}/> }
        </Button>
    );
}

SelectButton.propTypes = propTypes;

export default SelectButton;