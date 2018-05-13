import React from "react";
import PropTypes from "prop-types";
import { NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

import Svg from "components/Common/Svg";

const propTypes = {
    path: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired
};

function MenuItem({ path, text, icon }) {
    return (
        <NavItem>
            <NavLink to={ path } exact>
                <Svg {...icon} className="mr-2" /> 
                { text }
            </NavLink>
        </NavItem>
    );
}

MenuItem.propTypes = propTypes;

export default MenuItem;