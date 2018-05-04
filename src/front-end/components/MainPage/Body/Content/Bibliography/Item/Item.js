import React from "react";
import PropTypes from "prop-types";

import Svg from "components/Misc/Svg";
import SelectButton from "./Misc/SelectButton";
import StarButton   from "./Misc/StarButton";

import "./Item.css";

const propTypes = {
    icon: PropTypes.shape({
        width:   PropTypes.number,
        height:  PropTypes.number,
        viewBox: PropTypes.string,
        path:    PropTypes.string.isRequired
    }).isRequired,

    name:       PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isStarred:  PropTypes.bool.isRequired,
    
    onSelect:   PropTypes.func.isRequired,
    onStar:     PropTypes.func.isRequired,
    onOpen:     PropTypes.func.isRequired
};

class Item extends React.Component {

    render() {
        const { icon, name, isSelected, 
                isStarred, onSelect, onStar, 
                onOpen, ...rest } = this.props;

        let className = "item";

        if (isSelected) {
            className += " item--selected";
        }

        return (
            <div className={className} {...rest}>
                <div className="item__overlay item__overlay_top-left">
                    <SelectButton isSelected={isSelected} onClick={ onSelect }/>
                </div>
                <div className="item__overlay item__overlay_top-right">
                    <StarButton isStarred={isStarred} onClick={ onStar } />
                </div>
                <div className="item__body" onClick={ onOpen }>
                    <Svg {...icon} className="d-block m-auto"/>
                    <div className="text-center item__name">{ name }</div>
                </div>
            </div>
        );
    }
}

Item.propTypes = propTypes;

export default Item;