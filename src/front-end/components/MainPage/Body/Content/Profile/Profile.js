import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Form, Input } from "reactstrap";

import ParamRow from "./ParamRow";

const propTypes = {
    onAlert: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class Profile extends React.Component {

    render() {
        return (
            <div className="w-75">
                <h4>My Profile</h4>
                <hr className="border-dark" />

                <div>
                    <h5>General</h5>
                    <hr />
                    <ParamRow param="Username" value="Igor Morenec"/>
                    <ParamRow param="Email" value="Igor.Morenec@gmail.com"/>
                    <ParamRow param="Password" value="**********"/>
                </div>

                <div className="mt-5">
                    <h5 className="text-danger">Danger zone</h5>
                    <hr className="border-danger" />
                    <Row>
                        <Col xs="3">Delete my account</Col>
                        <Col xs="9">
                            <Button color="link" className="text-danger float-right pt-0">Delete</Button>
                        </Col>
                    </Row>
                    <i>Your data will be gone forever</i>
                </div>
            </div>
        );
    }
}

Profile.propTypes = propTypes;

export default Profile;