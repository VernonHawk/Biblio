import React from "react";
import PropTypes from "prop-types";
import {  } from "reactstrap";
//import { Switch, Route } from "react-router-dom";

import Item from "../Item";

import { folder } from "media/icons.json";

const propTypes = {
    name:       PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isStarred:  PropTypes.bool.isRequired
};

class Folder extends React.Component {

    onSelect = () => console.log("select folder");

    onStar = () => console.log("star folder");

    onOpen = () => console.log("Open folder");

    render() {
        const icon = {
            width:  95,
            height: 95,
            path:   folder
        };

        return (
            <Item
                {...this.props}
                onSelect={ this.onSelect }
                onStar={ this.onStar }
                onOpen={ this.onOpen }
                icon={icon}
                style={{ fill: "#ffbf00e5" }}
            />
        );
    }
}

Folder.propTypes = propTypes;

export default Folder;