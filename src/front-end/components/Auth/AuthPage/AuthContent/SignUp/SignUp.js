import React from "react";
import { Link } from "react-router-dom";
import { CardBody, CardFooter } from "reactstrap";
import PropTypes from "prop-types";

import AuthForm from "../AuthForm/AuthForm";

import params from "./params.json";

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
    
    onSubmit = val => {
        console.log(val);
    }

    render() {

        return (
            <React.Fragment>
                <CardBody>
                    <AuthForm 
                        params={params}
                        btnLabel="Sign Up"
                        onSubmit={this.onSubmit}
                    />
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