import React from "react";
import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

const propTypes = {

};

class Main extends React.Component {

    render() {
        return (
            <div>
                <Link to="profile">
                    Profile
                </Link>
                <Link to="archive">
                    Archive
                </Link>
            </div>
        );
    }
}

Main.propTypes = propTypes;

export default Main;