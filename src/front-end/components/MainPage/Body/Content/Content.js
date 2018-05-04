import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import Bibliography  from "./Bibliography/Bibliography";
import Profile       from "./Profile/Profile";

const propTypes = {
    onAlert: PropTypes.func.isRequired
};

class Content extends React.Component {

    render() {
        return (
            <div className="h-100 pl-3 pt-4">
                <Switch>
                    <Route
                        exact
                        path="/profile"
                        render={ props => 
                            <Profile {...props} onAlert={ this.props.onAlert } />}
                    />
                    <Route
                        path="/"
                        render={ props => 
                            <Bibliography {...props} onAlert={ this.props.onAlert } />}
                    />
                </Switch>
            </div>
        );
    }
}

Content.propTypes = propTypes;

export default Content;