import React from "react";
import PropTypes from "prop-types";

import FolderModal    from "components/Modals/FolderModal/FolderModal";
import ReferenceModal from "components/Modals/ReferenceModal/ReferenceModal";
import RenameModal    from "components/Modals/RenameModal/RenameModal";

import Sidebar  from "../Sidebar/Sidebar";

const propTypes = {
    selectedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    folderId:      PropTypes.string.isRequired,

    onStarSelected:    PropTypes.func.isRequired,
    onArchiveSelected: PropTypes.func.isRequired,
    onDataUpdate:      PropTypes.func.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class AllSidebar extends React.Component {

    state = {
        folderModal:    false,
        renameModal:    false,
        referenceModal: false
    }

    toggleModal = modalName =>
        this.setState( prevState => ({ [modalName]: !prevState[modalName] }) );

    render() {
        const { selectedItems, 
                onArchiveSelected, onStarSelected, 
                ...rest } = this.props;

        const toggleFolderModal    = () => this.toggleModal("folderModal");
        const toggleRenameModal    = () => this.toggleModal("renameModal");
        const toggleReferenceModal = () => this.toggleModal("referenceModal");
        
        const menu = {
            zero: [
                {
                    text: "New reference",
                    func: toggleReferenceModal
                },
                {
                    text: "New folder",
                    func: toggleFolderModal
                }
            ],
            one: [
                {
                    text: "Rename",
                    func: toggleRenameModal
                }
            ],
            many: [
                {
                    text: "Star selected",
                    func: onStarSelected
                },
                {
                    text: "Archive selected",
                    func: onArchiveSelected
                }
            ]
        };

        menu.one = [...menu.one, ...menu.many];

        const selectedAmount = selectedItems.length;

        return (
            <div className="pt-5">
                <Sidebar menu={ menu } selectedAmount={ selectedAmount } />
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

AllSidebar.propTypes = propTypes;

export default AllSidebar;