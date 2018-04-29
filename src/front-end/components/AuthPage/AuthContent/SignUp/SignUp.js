import React from "react";
import { Link } from "react-router-dom";
import { CardBody, CardFooter } from "reactstrap";
import PropTypes from "prop-types";

import AuthForm from "../AuthForm/AuthForm";

import fetcher from "fetcher";

import alertTypes from "components/GlobalAlert/alert-types.json";
import params from "./params-signup.json";

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    onAuth:  PropTypes.func.isRequired,
    onAlert: PropTypes.func.isRequired
};

class SignUp extends React.Component {

    // Keeps error messages
    state = {
        username:  "",
        email: "",
        pass:  ""
    }
    
    onSubmit = data => {
        this.getStateAfterValidation(data)
            .then( ({ newState, valid }) => {
                this.setState(newState);
        
                if (valid) {
                    this.setState({ username: "", email: "", pass: "" });

                    const acceptCodes = [400];
                    const errorMsg = "A problem occured while trying to sign you up. " +
                                     "Sorry for this, try again later, please";

                    return fetcher.post({ url: "/signup", data, acceptCodes, errorMsg })
                        .then( json => {
                            const error = json.error;

                            if (error) {
                                this.setState({ [error.cause]: error.message });
                            } else {
                                localStorage.setItem("token", json.token);

                                this.props.onAuth();
                            }
                        });
                }
            })
            .catch( err => {
                this.props.onAlert({ type: alertTypes.DANGER, msg: err.message });
            });
    }

    getStateAfterValidation = ({ username, pass }) => {
        const newState = { 
            username:  "",
            email: "",
            pass:  "" 
        };
        
        function validateName() {
            return new Promise( resolve => {
                if (!username.trim().length) {
                    newState.username = "Username can't consist only of whitespaces";

                    return resolve(false);
                }

                return resolve(true);
            });
        }
        
        function validatePassword() {
            return new Promise( resolve => {
                if (pass.length < 6) {
                    newState.pass = "Password is too short";

                    return resolve(false);
                } else if (pass.length > 50) {
                    newState.pass = "Password is too long";

                    return resolve(false);
                }

                return resolve(true);
            });
        }

        return Promise.all([validateName(), validatePassword()])
            .then( results => ({ newState, valid: results.every(res => res) }) );
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