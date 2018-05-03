import React from "react";
import { Navbar, Nav } from "reactstrap";

import MenuItem   from "./MenuItem";
import MenuHeader from "./MenuHeader";

import "./Menu.css";

import items from "./items.json";

function Menu() {
    const list = items.map( ({ path, text, icon }) => {
        return <MenuItem key={ path } path={ path } text={ text } icon={ icon } />;
    });

    return (
        <Navbar className="h-100 align-items-start pt-5 pl-4 bg-lightgrey">
            <Nav vertical>
                <MenuHeader>My bibliography</MenuHeader>
                { list }
            </Nav>
        </Navbar>
    );
}

export default Menu;