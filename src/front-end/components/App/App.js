import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LoginPage from "components/Login/LoginPage";
import MainPage from "components/Main/MainPage";
import PrivateRoute from "components/Misc/PrivateRoute";

export default class App extends React.Component {

    state = {
        isAuthenticated: false
    }

    onLogin = () => this.setState({ isAuthenticated: true });

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/login"
                        render={ (props) => <LoginPage {...props} onLogin={ this.onLogin } /> }
                    />
                    <PrivateRoute 
                        path="/"
                        component={MainPage}
                        isAuthenticated={this.state.isAuthenticated}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}
