import React from "react";
import {  } from "reactstrap";
import PropTypes from "prop-types";

import { REFERENCE } from "assets/itemTypes.json";

import Item from "./Item/Item";

import { reference } from "assets/icons.json";

const propTypes = {
    id:         PropTypes.string.isRequired,
    name:       PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isStarred:  PropTypes.bool.isRequired,

    onSelect: PropTypes.func.isRequired,
    onStar:   PropTypes.func.isRequired,
    onDrop:   PropTypes.func.isRequired
};

class Reference extends React.Component {

    onStar = () => this.props.onStar({ type: REFERENCE, id: this.props.id });

    onOpen = () => console.log("Open reference");
    
    onDrop = dropTarget => this.props.onDrop({...dropTarget, itemType: REFERENCE });

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
                onStar={ this.onStar }
                onOpen={ this.onOpen }
                onDrop={ this.onDrop }
                style={{ fill: "#3842cede" }}
            />
        );
    }
}

Reference.propTypes = propTypes;

export default Reference;