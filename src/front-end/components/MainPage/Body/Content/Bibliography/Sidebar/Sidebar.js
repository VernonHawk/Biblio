import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {  } from "reactstrap";

import SidebarButton from "./SidebarButton";
import FolderModal   from "./FolderModal";

const propTypes = {
    itemsSelected: PropTypes.bool.isRequired,

    onNewFolder:      PropTypes.func,
    onNewReference:   PropTypes.func,
    onStarSelected:   PropTypes.func,
    onDeleteSelected: PropTypes.func,
};

class Sidebar extends React.Component {

    state = {
        folderModal:    false,
        referenceModal: false
    }

    onNewFolder() {
        console.log("f");
    }

    onNewReference() {
        console.log("r");
    }

    onDeleteSelected() {
        console.log("d");
    }

    toggleModal = modalName => {
        this.setState( prevState => ({ [modalName]: !prevState[modalName] }) );
    }

    render() {
        const menu = this.props.itemsSelected ? 
            ( 
            <Fragment>
                <SidebarButton onClick={ this.props.onStarSelected }>Star selected</SidebarButton>
                <SidebarButton onClick={ this.onDeleteSelected }>Delete selected</SidebarButton>
            </Fragment>
            ) :
            (  
            <Fragment>
                <SidebarButton onClick={ () => this.toggleModal("folderModal") }>New folder</SidebarButton>
                <SidebarButton onClick={ this.onNewReference }>New reference</SidebarButton>
            </Fragment>
            );

        return (
            <div className="pt-5">
                { menu }
                <FolderModal 
                    isOpen={ this.state.folderModal } 
                    toggle={ this.toggleModal } 
                    onSubmit={ this.onNewFolder }
                />
            </div>
        );
    }
}

Sidebar.propTypes = propTypes;

export default Sidebar;