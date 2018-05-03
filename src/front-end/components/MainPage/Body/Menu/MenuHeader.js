import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {
    children: PropTypes.node.isRequired
};

function MenuHeader({ children }) {
    return (
        <Link to="/" className="mb-3">
            <h5>{ children }</h5>
        </Link>
    );
}

MenuHeader.propTypes = propTypes;

export default MenuHeader;