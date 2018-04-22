import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, CardBody, CardFooter } from "reactstrap";
import PropTypes from "prop-types";

import AuthFormGroup from "./AuthFormGroup";

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,
};

class LogIn extends React.Component { // TODO: make generic
    
    state = {
        email: "",
        pass:  ""
    }

    render() {
        return (
            <React.Fragment>
                <CardBody>
                    <Form>
                        <AuthFormGroup
                            label="Email"
                            id="email"
                            type="email"
                            placeholder="For example: example@mail.com"
                            value={this.state.email}
                            onChange={ e => this.setState({ email: e.target.value })}
                        />
                        <AuthFormGroup
                            label="Password"
                            id="pass"
                            type="password"
                            placeholder="For example: *********"
                            value={this.state.pass}
                            onChange={ e => this.setState({ pass: e.target.value })}
                        />
                    </Form>
                </CardBody>

                <CardFooter>
                    Do not have an account?
                    <Link to={"/a/signup"}> Sign up</Link>
                </CardFooter>
            </React.Fragment>
        );
    }
}

LogIn.propTypes = propTypes;

export default LogIn;