import React from "react";
import {  } from "reactstrap";
import PropTypes from "prop-types";
//import { Switch, Route } from "react-router-dom";

import Item from "../Item";

import { reference } from "media/icons.json";

const propTypes = {
    name:       PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isStarred:  PropTypes.bool.isRequired
};

class Reference extends React.Component {

    onSelect = () => console.log("select reference");

    onStar = () => console.log("star reference");

    onOpen = () => console.log("Open reference");

    render() {
        const icon = {
            width:  90,
            height: 90,
            path:   reference
        };

        return (
            <Item
                {...this.props}
                icon={icon}
                onSelect={ this.onSelect }
                onStar={ this.onStar }
                onOpen={ this.onOpen }
                style={{ fill: "#3842cede" }}
            />
        );
    }
}

Reference.propTypes = propTypes;

export default Reference;