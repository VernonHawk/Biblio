import React from "react";
import { Navbar, Row, Col } from "reactstrap";
import PropTypes from "prop-types";

import Brand       from "./Brand/Brand";
import Search      from "./Search/Search";
import ProfileMenu from "./ProfileMenu/ProfileMenu";

const propTypes = {
    username:  PropTypes.string.isRequired,
    onSearch:  PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

function Header({ username, onSearch, onSignOut }) {
    return (
        <Navbar className="bg-light pl-4 pr-4">
            <Row className="w-100 align-items-center">
                <Col xs="3">
                    <Brand />
                </Col>
                <Col xs="6">
                    <Search onSearch={ onSearch }/>
                </Col>
                <Col xs="3">
                    <ProfileMenu username={ username } onSignOut={ onSignOut }/> 
                </Col>
            </Row>
        </Navbar>
    );
}

Header.propTypes = propTypes;

export default Header;