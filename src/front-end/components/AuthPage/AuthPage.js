import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Row } from "reactstrap";
import PropTypes from "prop-types";

import AuthContent from "./AuthContent/AuthContent";

import "./AuthPage.css";

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    onAuth:  PropTypes.func.isRequired,
    onAlert: PropTypes.func.isRequired
};

class AuthPage extends React.Component {

    state = {
        redirectToReferrer: false
    }

    onAuth = () => {
        this.props.onAuth();
        this.setState({ redirectToReferrer: true });
    }
    
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        if (this.state.redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <Row className="justify-content-center h-100" id="auth-page">
                <Route 
                    render={ props => 
                        <AuthContent 
                            {...props} 
                            onAuth={ this.onAuth }
                            onAlert={ this.props.onAlert } 
                        /> 
                    } 
                />
            </Row>
        );
    }
}

AuthPage.propTypes = propTypes;

export default AuthPage;