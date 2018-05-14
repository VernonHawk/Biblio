import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import { FOLDER, REFERENCE } from "assets/itemTypes.json";

import Reference from "./Reference";
import Folder    from "./Folder";

const propTypes = {
    data: PropTypes.arrayOf( PropTypes.shape({
        //TODO: add props
    })).isRequired,

    onItemSelect: PropTypes.func.isRequired,
    onItemStar:   PropTypes.func.isRequired,
    onItemDrop:   PropTypes.func.isRequired,
    onAlert:      PropTypes.func.isRequired
};

class Items extends React.Component {

    render() {
        const { data, onItemSelect, onItemStar, onItemDrop } = this.props;

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
                        onSelect={ onItemSelect } onStar={ onItemStar }
                        onDrop={ onItemDrop }
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