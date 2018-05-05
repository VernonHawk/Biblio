import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { DragDropContextProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import All     from "./All";
import Recent  from "./Recent";
import Starred from "./Starred";
import Archive from "./Archive";
import NotFound from "components/Misc/NotFound";

const propTypes = {
    onAlert: PropTypes.func.isRequired
};

class Bibliography extends React.Component {

    render() {
        const onAlert = this.props.onAlert;

        return (
            <DragDropContextProvider backend={ Backend }>
                <Switch>
                    <Route exact path="/recent"  
                           render={ props => <Recent {...props} onAlert={onAlert} /> } 
                    />
                    <Route exact path="/starred" 
                           render={ props => <Starred {...props} onAlert={onAlert} /> } 
                    />
                    <Route exact path="/archive" 
                           render={ props => <Archive {...props} onAlert={onAlert} /> } 
                    />
                    <Route exact path="/:folder?" 
                           render={ props => <All {...props} onAlert={onAlert} /> } 
                    />
                    <Route component={ NotFound } />
                </Switch>
            </DragDropContextProvider>
        );
    }
}

Bibliography.propTypes = propTypes;

export default Bibliography;