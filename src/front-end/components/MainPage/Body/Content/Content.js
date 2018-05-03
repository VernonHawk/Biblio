import React from "react";
import { Switch, Route } from "react-router-dom";
//import PropTypes from "prop-types";

import Bibliography  from "./Bibliography/Bibliography";
import Profile       from "./Profile/Profile";

const propTypes = {

};

class Content extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/profile" component={Profile} />
                <Route       path="/"        component={Bibliography} />
            </Switch>
        );
    }
}

Content.propTypes = propTypes;

export default Content;