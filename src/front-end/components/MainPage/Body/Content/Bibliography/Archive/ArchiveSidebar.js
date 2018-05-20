import React from "react";
import PropTypes from "prop-types";

import RenameModal from "components/Modals/RenameModal/RenameModal";
import DeleteItemModal from "components/Modals/DeleteItemModal/DeleteItemModal";

import Sidebar from "../Sidebar/Sidebar";

const propTypes = {
    selectedItems: PropTypes.arrayOf(PropTypes.object).isRequired,

    onStarSelected:      PropTypes.func.isRequired,
    onUnarchiveSelected: PropTypes.func.isRequired,
    onDeleteSelected: PropTypes.func.isRequired,
    onDataUpdate:        PropTypes.func.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class ArchiveSidebar extends React.Component {

    state = {
        renameModal: false,
        deleteModal: false
    }

    toggleModal = modalName =>
        this.setState( prevState => ({ [modalName]: !prevState[modalName] }) );

    render() {
        const { selectedItems, 
                onUnarchiveSelected, onStarSelected, onDeleteSelected,
                ...rest } = this.props;
        
        const toggleRenameModal = () => this.toggleModal("renameModal");
        const toggleDeleteModal = () => this.toggleModal("deleteModal");

        const menu = {
            zero: [],
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
                    text: "Unarchive selected",
                    func: onUnarchiveSelected
                },
                {
                    text: "Delete selected",
                    func: toggleDeleteModal
                }
            ]
        };

        menu.one = [...menu.one, ...menu.many];

        const selectedAmount = selectedItems.length;

        return (
            <div className="pt-5">
                <Sidebar menu={ menu } selectedAmount={ selectedAmount } />
                <RenameModal 
                    isOpen={ this.state.renameModal }
                    toggle={ toggleRenameModal }
                    item={ selectedAmount === 1 ? selectedItems[0] : {} }

                    {...rest}
                />
                <DeleteItemModal 
                    isOpen={ this.state.deleteModal }
                    toggle={ toggleDeleteModal }
                    onConfirm={ onDeleteSelected }
                />
            </div>
        );
    }
}

ArchiveSidebar.propTypes = propTypes;

export default ArchiveSidebar;