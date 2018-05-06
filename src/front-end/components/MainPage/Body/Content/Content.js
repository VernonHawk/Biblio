import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import Bibliography  from "./Bibliography/Bibliography";
import Profile       from "./Profile/Profile";

const propTypes = {
    userId:  PropTypes.string.isRequired,
    onAlert: PropTypes.func.isRequired
};

class Content extends React.Component {

    render() {
        const { userId, onAlert } = this.props;

        return (
            <div className="h-100 pl-3 pt-4">
                <Switch>
                    <Route
                        exact
                        path="/profile"
                        render={ props => 
                            <Profile {...props} userId={userId} onAlert={onAlert} /> }
                    />
                    <Route
                        path="/"
                        render={ props => 
                            <Bibliography {...props} userId={userId} onAlert={onAlert} /> }
                    />
                </Switch>
            </div>
        );
    }
}

Content.propTypes = propTypes;

export default Content;