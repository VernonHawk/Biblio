import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import NotFound from "components/Misc/NotFound";

const propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object 
};

export default class MainPage extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" render={ () => <div>Main</div> } />
                <Route exact path="/profile" render={ () => <div>Profile</div> } />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

MainPage.propTypes = propTypes;
