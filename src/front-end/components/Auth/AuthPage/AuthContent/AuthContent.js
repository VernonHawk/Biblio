import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Card } from "reactstrap";
import PropTypes from "prop-types";

import AuthHeader from "./AuthHeader";
import LogIn  from "./LogIn";
import SignUp from "./SignUp";

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,
};

class AuthContent extends React.PureComponent {
    
    render() {
        const url = this.props.match.url;

        return (
            <Card className="align-self-center border-warning">
                <AuthHeader />
                <Switch>
                    <Route exact path={`${url}/signup`} component={SignUp} />
                    <Route exact path={`${url}/login`}  component={LogIn} />
                    <Redirect to={`${url}/signup`} />
                </Switch>
            </Card>
        );
    }
}

AuthContent.propTypes = propTypes;

export default AuthContent;