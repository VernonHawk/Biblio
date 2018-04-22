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

class SignUp extends React.Component {

    state = {
        name:  "",
        email: "",
        pass:  ""
    }
    
    render() {
        return (
            <React.Fragment>
                <CardBody>
                    <Form>
                        <AuthFormGroup
                            label="Full name"
                            id="name"
                            type="text"
                            placeholder="For example: John Doe"
                            value={this.state.name}
                            onChange={ e => this.setState({ name: e.target.value })}
                        />
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
                    Already have an account?
                    <Link to={"/a/login"}> Log in</Link>
                </CardFooter>
            </React.Fragment>
        );
    }
}

SignUp.propTypes = propTypes;

export default SignUp;