import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import Menu    from "./Menu/Menu";
import Content from "./Content/Content";

const propTypes = {
    onAlert:   PropTypes.func.isRequired
};

class Body extends React.Component {

    render() {
        return (
            <Row className="h-100">
                <Col xs="2">
                    <Menu />
                </Col>
                <Col xs="10">
                    <Content />
                </Col>
            </Row>
        );
    }
}

Body.propTypes = propTypes;

export default Body;
