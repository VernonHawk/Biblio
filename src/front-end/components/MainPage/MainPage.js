import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import Main     from "./Main";
import Starred  from "./Starred";
import Archive  from "./Archive";
import Profile  from "./Profile";
import NotFound from "components/Misc/NotFound";

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object 
};

class MainPage extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/"        component={Main}    />
                <Route exact path="/starred" component={Starred} />
                <Route exact path="/archive" component={Archive} />
                <Route exact path="/profile" component={Profile} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

MainPage.propTypes = propTypes;

export default MainPage;
