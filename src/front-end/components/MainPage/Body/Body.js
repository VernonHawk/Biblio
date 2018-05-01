import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import Menu         from "./Menu/Menu";
import Bibliography from "./Content/Bibliography";

/*import Starred  from "./Content/Starred";
import Archive  from "./Content/Archive";
import Profile  from "./Content/Profile";
import NotFound from "components/Misc/NotFound";*/

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

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
                    <Bibliography />
                </Col>
            </Row>
        );
    }
}

/*
<Switch>
    <Route exact path="/"        component={Main}    />
    <Route exact path="/starred" component={Starred} />
    <Route exact path="/archive" component={Archive} />
    <Route exact path="/profile" component={Profile} />
    <Route component={NotFound} />
</Switch>
*/

Body.propTypes = propTypes;

export default Body;
