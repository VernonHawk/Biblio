import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { DropTarget } from "react-dnd";

import { FOLDER } from "assets/itemTypes.json";

import Item from "./Item/Item";

import { ITEM } from "assets/itemTypes.json";

import { folder } from "assets/icons.json";

const propTypes = {
    id:         PropTypes.string.isRequired,
    name:       PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isStarred:  PropTypes.bool.isRequired,

    onSelect: PropTypes.func.isRequired,
    onStar:   PropTypes.func.isRequired
};

const folderTarget = {
    drop({ id }) {
        return { id };
    },

    canDrop(props, monitor) {
        return props.id !== monitor.getItem().id;
    }
};

function collect(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class Folder extends React.Component {

    state = {
        open: false
    }

    onStar = () => this.props.onStar({ type: FOLDER, id: this.props.id });

    onOpen = () => this.setState({ open: true });

    onDrop = dropTarget => this.props.onDrop({...dropTarget, itemType: FOLDER });

    render() {
        const { id, connectDropTarget, ...rest } = this.props;

        const icon = {
            width:  95,
            height: 95,
            path:   folder
        };

        if (this.state.open) {
            return <Redirect to={ id } />;
        }

        return connectDropTarget(
            <div>
                <Item
                    {...rest}
                    id={id}
                    onStar={ this.onStar }
                    onOpen={ this.onOpen }
                    onDrop={ this.onDrop }
                    icon={icon}
                    style={{ fill: "#ecb10fee" }}
                />
            </div>
        );
    }
}

Folder.propTypes = propTypes;

export default DropTarget(ITEM, folderTarget, collect)(Folder);