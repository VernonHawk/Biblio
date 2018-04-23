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

    // Keeps error messages!
    state = {
        name:  "",
        email: "",
        pass:  ""
    }
    
    onSubmit = form => {
        const validation = this.getStateAfterValidation(form);

        this.setState(validation.newState);

        if (validation.valid) {
            console.log("valid", form);
        }
    }

    getStateAfterValidation = ({ name: fullName, email, pass }) => {
        const newState = { 
            name:  "",
            email: "",
            pass:  "" 
        };

        let valid = true;

        if (!fullName.trim().length) {
            newState.name = "Name can't consist only of whitespaces";
            valid = false;
        }
        
        if (pass.length < 6) {
            newState.pass = "Password is too short";
            valid = false;
        } else if (pass.length > 50) {
            newState.pass = "Password is too long";
            valid = false;
        }

        // TODO: send request to check if email is taken
        const emailTaken = true;

        if (emailTaken) {
            newState.email = "This email is already taken";
            valid = false;
        }

        return { newState, valid };
    }

    render() {

        return (
            <React.Fragment>
                <CardBody>
                    <AuthForm 
                        params={params}
                        btnLabel="Sign Up"
                        onSubmit={this.onSubmit}
                        errors={this.state}
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