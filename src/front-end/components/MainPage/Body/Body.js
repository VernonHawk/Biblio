import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import Menu    from "./Menu/Menu";
import Content from "./Content/Content";

const propTypes = {
    userId:  PropTypes.string.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

function Body({ userId, onAlert, onSignOut }) {
    return (
        <Row className="h-100">
            <Col xs="3">
                <Menu />
            </Col>
            <Col xs="9">
                <Content
                    userId={ userId }
                    onAlert={ onAlert }
                    onSignOut={ onSignOut }
                />
            </Col>
        </Row>
    );
}

Body.propTypes = propTypes;

export default Body;
