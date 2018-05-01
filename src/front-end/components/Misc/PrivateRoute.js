import React from "react";
import { Route, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

const propTypes = {
    render:          PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function PrivateRoute({ render, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={ props =>
                isAuthenticated ? 
                    render(props) : 
                    (<Redirect
                        to={{
                            pathname: "/a/signin",
                            state: { from: props.location }
                        }}
                    />)
            }
        />
    );
}

PrivateRoute.propTypes = propTypes;

export default PrivateRoute;