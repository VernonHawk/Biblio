import React from "react";
import { Switch, Route } from "react-router-dom";
//import PropTypes from "prop-types";

import All     from "./All";
import Recent  from "./Recent";
import Starred from "./Starred";
import Archive from "./Archive";
import NotFound from "components/Misc/NotFound";

const propTypes = {

};

class Bibliography extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/"        component={All} />
                <Route exact path="/recent"  component={Recent} />
                <Route exact path="/starred" component={Starred} />
                <Route exact path="/archive" component={Archive} />
                <Route                       component={NotFound} />
            </Switch>
        );
    }
}

Bibliography.propTypes = propTypes;

export default Bibliography;