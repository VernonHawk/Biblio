import React from "react";
import { Breadcrumbs, Row, Col } from "reactstrap";
//import { Switch, Route } from "react-router-dom";
//import PropTypes from "prop-types";

import Reference from "./Item/Reference/Reference";
import Folder    from "./Item/Folder/Folder";

const propTypes = {

};

class All extends React.Component {

    state = {
        items: [
            { 
                id: 0,
                name: "Very long-long name to display",
                type: "folder",
                isSelected: true,
                isStarred:  false
            },
            { 
                id: 1,
                name: "Very long-long name to display",
                type: "folder",
                isSelected: true,
                isStarred:  true
            },
            { 
                id: 2,
                name: "Very long-long name to display",
                type: "folder",
                isSelected: false,
                isStarred:  true
            },
            { 
                id: 3,
                name: "Very long-long name to display",
                type: "folder",
                isSelected: false,
                isStarred:  false
            },
            { 
                id: 4,
                name: "Very long-long name to display",
                type: "reference",
                isSelected: true,
                isStarred:  false
            },
            { 
                id: 5,
                name: "Very long-long name to display",
                type: "reference",
                isSelected: true,
                isStarred:  true
            },
            { 
                id: 6,
                name: "Very long-long name to display",
                type: "reference",
                isSelected: false,
                isStarred:  true
            },
            { 
                id: 7,
                name: "Very long-long name to display",
                type: "reference",
                isSelected: false,
                isStarred:  false
            },
        ]
    }

    render() {
        const items = this.state.items.map( ({ id, type, ...rest }) => {
            let Component;

            switch (type) {
                case "folder":
                    Component = Folder;
                    break;
                case "reference":
                    Component = Reference;
                    break;
                default:
                    // TODO: Do something in this case
                    console.error("Unknown component type!");
                    break;
            } 

            return (
                <Col xs="3" key={id}>
                    <Component id={id} {...rest} />
                </Col>
            );
        });

        return (
            <Row>
                <Col xs="9">
                    <div>Home / Dir / Dir2 / Dir 3</div>
                    <hr />
                    <Row>
                        { items }
                    </Row>
                </Col>
                <Col xs="3">
                    <div>New Folder</div>
                    <div>New file</div>
                    <div>Delete selected</div>
                    <div>Star selected</div>
                    <div>Archive selected</div>
                </Col>
            </Row>
        );
    }
}

All.propTypes = propTypes;

export default All;