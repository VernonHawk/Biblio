import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";

import AuthPage from "components/Auth/AuthPage/AuthPage";
import MainPage from "components/MainPage/MainPage";
import PrivateRoute from "components/Misc/PrivateRoute";

class App extends React.Component {

    state = {
        isAuthenticated: false
    }

    onAuth = () => this.setState({ isAuthenticated: true });

    render() {
        return (
            <BrowserRouter>
                <Container fluid className="h-100">
                    <Switch>
                        <Route
                            path="/a"
                            render={ (props) => <AuthPage {...props} onAuth={ this.onAuth } /> }
                        />
                        <PrivateRoute
                            path="/"
                            component={ MainPage }
                            isAuthenticated={ this.state.isAuthenticated }
                        />
                    </Switch>
                </Container>
            </BrowserRouter>
        );
    }
}

export default App;