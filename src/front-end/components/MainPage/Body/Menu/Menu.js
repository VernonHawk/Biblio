import React from "react";
import { Navbar, Nav } from "reactstrap";

import MenuItem   from "./MenuItem";
import MenuHeader from "./MenuHeader";

import "./Menu.css";

import items from "./items.json";
import icons from "assets/icons.json";

function Menu() {
    const list = items.map( ({ path, text, icon }) => {
        return (
            <MenuItem 
                key={ path } path={ path } text={ text } 
                icon={{ ...icon, path: icons[icon.path] }} 
            />
        );
    });

    return (
        <Navbar className="h-100 align-items-start pt-5 pl-5 bg-lightgrey">
            <Nav vertical>
                <MenuHeader>My bibliography</MenuHeader>
                { list }
            </Nav>
        </Navbar>
    );
}

export default Menu;