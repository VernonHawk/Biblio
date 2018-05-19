import React from "react";
import PropTypes from "prop-types";

import RenameModal from "components/Modals/RenameModal/RenameModal";

import Sidebar from "../Sidebar/Sidebar";

const propTypes = {
    selectedItems: PropTypes.arrayOf(PropTypes.object).isRequired,

    onUnstarSelected:  PropTypes.func.isRequired,
    onArchiveSelected: PropTypes.func.isRequired,
    onDataUpdate:      PropTypes.func.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class StarredSidebar extends React.Component {

    state = {
        renameModal: false
    }

    toggleModal = () => 
        this.setState( prevState => ({ renameModal: !prevState.renameModal }) );

    render() {
        const { selectedItems, 
                onArchiveSelected, onUnstarSelected, 
                ...rest } = this.props;
        
        const menu = {
            zero: [],
            one: [
                {
                    text: "Rename",
                    func: this.toggleModal
                }
            ],
            many: [
                {
                    text: "Unstar selected",
                    func: onUnstarSelected
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
                <RenameModal 
                    isOpen={ this.state.renameModal }
                    toggle={ this.toggleModal }
                    item={ selectedAmount === 1 ? selectedItems[0] : {} }

                    {...rest}
                />
            </div>
        );
    }
}

StarredSidebar.propTypes = propTypes;

export default StarredSidebar;