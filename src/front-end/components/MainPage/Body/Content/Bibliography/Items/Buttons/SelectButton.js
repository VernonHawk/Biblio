import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

import Svg from "components/Common/Svg";

import "./SelectButton.css";

import { check } from "assets/icons.json";

const propTypes = {
    isSelected: PropTypes.bool.isRequired
};

function SelectButton({ isSelected, ...rest }) {
    let className = "button_select";

    if (isSelected) {
        className += " button_select--selected";
    }

    const checkIcon = {
        width:  13,
        height: 12,
        path: check
    };

    const title = isSelected ? "Deselect" : "Select";

    return (
        <Button
            outline color="primary" 
            title={ title }
            className={ className }
            {...rest}
        >
            { isSelected && <Svg {...checkIcon} style={{ fill: "white" }}/> }
        </Button>
    );
}

SelectButton.propTypes = propTypes;

export default SelectButton;