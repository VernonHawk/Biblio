import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import { FOLDER, REFERENCE } from "assets/itemTypes.json";

import Reference from "./Reference";
import Folder    from "./Folder";

const propTypes = {
    data: PropTypes.arrayOf( PropTypes.shape({
        _id:  PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired,
        userId:   PropTypes.string.isRequired,
        lastModified: PropTypes.string.isRequired,
        isArchived: PropTypes.bool.isRequired,
        isStarred:  PropTypes.bool.isRequired,
        
        isSelected: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
    })).isRequired,

    onItemSelect: PropTypes.func.isRequired,
    onItemStar:   PropTypes.func.isRequired,
    onItemDrop:   PropTypes.func.isRequired,

    onDataUpdate: PropTypes.func.isRequired,
    onSignOut:    PropTypes.func.isRequired,
    onAlert:      PropTypes.func.isRequired
};

class Items extends React.Component {

    render() {
        const {
            data, onItemSelect, onItemStar, onItemDrop, 
            onDataUpdate, onSignOut, onAlert
        } = this.props;

        const items = data.map( ({ _id, type, ...rest }) => {
            let Component;

            switch (type) {
                case FOLDER:
                    Component = Folder;
                    break;
                case REFERENCE:
                    Component = Reference;
                    break;
                default:
                    // TODO: Inform user
                    return null;
            }

            return (
                <Col xs="3" key={_id}>
                    <Component
                        id={_id} {...rest}

                        onSelect={ onItemSelect } 
                        onStar={ onItemStar }
                        onDrop={ onItemDrop }

                        onDataUpdate={ onDataUpdate }
                        onSignOut={ onSignOut }
                        onAlert={ onAlert }
                    />
                </Col>
            );
        });

        return (
            <Row>
                { items }
            </Row>
        );
    }
}

Items.propTypes = propTypes;

export default Items;