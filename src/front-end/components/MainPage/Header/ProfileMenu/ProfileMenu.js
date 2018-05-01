import React from "react";
import PropTypes from "prop-types";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";

import Svg from "components/Misc/Svg";

import "./ProfileMenu.css";

import icon from "./icon-user.json";

const propTypes = {
    username:   PropTypes.string.isRequired,
    onSignOut:  PropTypes.func.isRequired
};

class ProfileMenu extends React.PureComponent {

    state = {
        isOpen: false
    }
    
    toggle = () => this.setState( prevState => ({ isOpen: !prevState.isOpen }) )

    render() {
        const { username, onSignOut } = this.props;

        return (
            <ButtonDropdown
                isOpen={ this.state.isOpen }
                toggle={ this.toggle }
                className="float-right"
                group={ false }
                direction="left"
            >
                <DropdownToggle id="btn-dropdown" className="bg-white">
                    <Svg {...icon} />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem disabled>{ username }</DropdownItem>
                    <DropdownItem divider />
                    <Link to="/account" className="dropdown-item">Settings</Link>
                    <DropdownItem divider />
                    <DropdownItem onClick={ onSignOut }>Sign out</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

ProfileMenu.propTypes = propTypes;

export default ProfileMenu;