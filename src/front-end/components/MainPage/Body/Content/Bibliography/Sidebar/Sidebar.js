import React, { Fragment } from "react";
import PropTypes from "prop-types";

import FolderModal    from "components/Modals/FolderModal/FolderModal";
import ReferenceModal from "components/Modals/ReferenceModal/ReferenceModal";

import SidebarButton  from "./SidebarButton";

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
        const { itemsSelected, 
                onDeleteSelected, onStarSelected, 
                ...rest } = this.props;

        const toggleFolderModal    = () => this.toggleModal("folderModal");
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
                <SidebarButton onClick={ toggleReferenceModal }>New reference</SidebarButton>
                <SidebarButton onClick={ toggleFolderModal }>New folder</SidebarButton>
            </Fragment>
            );

        return (
            <div className="pt-5">
                { menu }
                <FolderModal
                    isOpen={ this.state.folderModal }
                    toggle={ toggleFolderModal }

                    {...rest}
                />
                <ReferenceModal
                    isEditing={ false }
                    isOpen={ this.state.referenceModal }
                    toggle={ toggleReferenceModal }

                    {...rest}
                />
            </div>
        );
    }
}

Sidebar.propTypes = propTypes;

export default Sidebar;