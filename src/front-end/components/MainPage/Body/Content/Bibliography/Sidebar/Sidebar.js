import React, { Fragment } from "react";
import PropTypes from "prop-types";

import FolderModal    from "components/Modals/FolderModal/FolderModal";
import ReferenceModal from "components/Modals/ReferenceModal/ReferenceModal";
import RenameModal    from "components/Modals/RenameModal/RenameModal";

import SidebarButton  from "./SidebarButton";

const propTypes = {
    selectedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    folderId:      PropTypes.string.isRequired,

    onStarSelected:    PropTypes.func.isRequired,
    onArchiveSelected: PropTypes.func.isRequired,
    onDataUpdate:      PropTypes.func.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class Sidebar extends React.Component {

    state = {
        folderModal:    false,
        renameModal:    false,
        referenceModal: false
    }

    toggleModal = modalName => {
        this.setState( prevState => ({ [modalName]: !prevState[modalName] }) );
    }

    render() {
        const { selectedItems, 
                onArchiveSelected, onStarSelected, 
                ...rest } = this.props;

        const toggleFolderModal    = () => this.toggleModal("folderModal");
        const toggleRenameModal    = () => this.toggleModal("renameModal");
        const toggleReferenceModal = () => this.toggleModal("referenceModal");

        let menu = null;

        const zeroSelectedMenu = (
            <Fragment key="zeroSelectedMenu">
                <SidebarButton onClick={ toggleReferenceModal }>New reference</SidebarButton>
                <SidebarButton onClick={ toggleFolderModal }>New folder</SidebarButton>
            </Fragment>
        );

        const oneSelectedMenu = (
            <Fragment key="oneSelectedMenu">
                <SidebarButton onClick={ toggleRenameModal }>Rename</SidebarButton>
            </Fragment>
        );

        const manySelectedMenu = (
            <Fragment key="manySelectedMenu">
                <SidebarButton onClick={ onStarSelected }>Star selected</SidebarButton>
                <SidebarButton onClick={ onArchiveSelected }>Archive selected</SidebarButton>
            </Fragment>
        );

        const selectedAmount = selectedItems.length;

        switch (selectedAmount) {
            case 0:
                menu = zeroSelectedMenu;
                break;
            case 1:
                menu = [oneSelectedMenu, manySelectedMenu];
                break;
            default:
                menu = manySelectedMenu;
                break;
        }

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
                <RenameModal 
                    isOpen={ this.state.renameModal }
                    toggle={ toggleRenameModal }
                    item={ selectedAmount === 1 ? selectedItems[0] : {} }

                    {...rest}
                />
            </div>
        );
    }
}

Sidebar.propTypes = propTypes;

export default Sidebar;