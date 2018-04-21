import React from "react";
import { Switch, Route } from "react-router-dom";

import NotFound from "components/Misc/NotFound";

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
