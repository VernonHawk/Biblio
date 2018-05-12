import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {  } from "reactstrap";

import SidebarButton from "./SidebarButton";
import FolderModal   from "./FolderModal/FolderModal";

const propTypes = {
    itemsSelected: PropTypes.bool.isRequired,
    folderId:      PropTypes.string.isRequired,

    onStarSelected:   PropTypes.func.isRequired,
    onDeleteSelected: PropTypes.func.isRequired,
    onDataUpdate:     PropTypes.func.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class Sidebar extends React.Component {

    state = {
        folderModal:    false,
        referenceModal: false
    }

    toggleModal = modalName => {
        this.setState( prevState => ({ [modalName]: !prevState[modalName] }) );
    }

    render() {
        const { itemsSelected, folderId, 
                onDeleteSelected, onStarSelected, 
                onDataUpdate, 
                onSignOut, onAlert } = this.props;

        const toggleFolderModal = () => this.toggleModal("folderModal");
        const toggleReferenceModal = () => this.toggleModal("referenceModal");

        const menu = itemsSelected ? 
            ( 
            <Fragment>
                <SidebarButton onClick={ onStarSelected }>Star selected</SidebarButton>
                <SidebarButton onClick={ onDeleteSelected }>Delete selected</SidebarButton>
            </Fragment>
            ) :
            (  
            <Fragment>
                <SidebarButton onClick={ toggleFolderModal }>New folder</SidebarButton>
                <SidebarButton onClick={ () => console.log("new ref") }>New reference</SidebarButton>
            </Fragment>
            );

        return (
            <div className="pt-5">
                { menu }
                <FolderModal
                    folderId={ folderId }

                    isOpen={ this.state.folderModal }
                    toggle={ toggleFolderModal }
                    onDataUpdate={ onDataUpdate }

                    onSignOut={ onSignOut }
                    onAlert={ onAlert }
                />
            </div>
        );
    }
}

Sidebar.propTypes = propTypes;

export default Sidebar;