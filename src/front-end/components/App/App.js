import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";

import AuthPage     from "components/Auth/AuthPage/AuthPage";
import MainPage     from "components/MainPage/MainPage";
import PrivateRoute from "components/Misc/PrivateRoute";
import GlobalAlert  from "components/GlobalAlert/GlobalAlert";

class App extends React.Component {

    state = {
        isAuthenticated: false,
        alert: null
    }

    onAuth = () => this.setState({ isAuthenticated: true });

    onAlert = ({ type, msg }) => {
        this.setState({ alert: { type, msg }});
    }

    render() {
        return (
            <BrowserRouter>
                <Container fluid className="h-100">
                    <GlobalAlert alert={this.state.alert} />
                    <Switch>
                        <Route
                            path="/a"
                            render={ (props) => 
                                <AuthPage 
                                    {...props} 
                                    onAuth={ this.onAuth } 
                                    onAlert={ this.onAlert } 
                                /> 
                            }
                        />
                        <PrivateRoute
                            path="/"
                            component={ MainPage }
                            isAuthenticated={ this.state.isAuthenticated }
                            onAlert={ this.onAlert }
                        />
                    </Switch>
                </Container>
            </BrowserRouter>
        );
    }
}

export default App;