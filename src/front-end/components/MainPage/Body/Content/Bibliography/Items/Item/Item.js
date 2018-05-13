import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";

import { ITEM } from "assets/itemTypes.json";

import Svg from "components/Common/Svg";
import SelectButton from "./SelectButton";
import StarButton   from "./StarButton";

import "./Item.css";

const propTypes = {
    icon: PropTypes.shape({
        width:   PropTypes.number,
        height:  PropTypes.number,
        viewBox: PropTypes.string,
        path:    PropTypes.string.isRequired
    }).isRequired,

    id:         PropTypes.string.isRequired,
    name:       PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isStarred:  PropTypes.bool.isRequired,
    
    onSelect: PropTypes.func.isRequired,
    onStar:   PropTypes.func.isRequired,
    onOpen:   PropTypes.func.isRequired,
    onDrop:   PropTypes.func.isRequired
};

const itemSource = {
    beginDrag({ id }) {
        return { id };
    },

    endDrag(props, monitor) {
        const dropResult = monitor.getDropResult();
        
        if (dropResult) {
			props.onDrop({ itemId: props.id, targetId: dropResult.id });
		}
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class Item extends React.Component {

    onSelect = () => this.props.onSelect(this.props.id);

    render() {
        const { icon, name, style,
                isSelected, isStarred, 
                onStar, onOpen,
                connectDragSource, isDragging 
            } = this.props;

        let className = "item";

        if (isSelected) {
            className += " item--selected";
        }

        if (isDragging) {
            className += " dragged";
        }

        return connectDragSource(
            <div className={className} style={style}>
                <div className="item__overlay item__overlay_top-left">
                    <SelectButton isSelected={isSelected} onClick={ this.onSelect }/>
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

export default DragSource(ITEM, itemSource, collect)(Item);