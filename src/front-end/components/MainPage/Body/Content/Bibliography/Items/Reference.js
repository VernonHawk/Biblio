import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { REFERENCE } from "assets/itemTypes.json";

import ReferenceModal from "components/Modals/ReferenceModal/ReferenceModal";
import Item from "./Item/Item";

import { reference } from "assets/icons.json";

const propTypes = {
    id:   PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    userId:   PropTypes.string.isRequired,
    lastModified: PropTypes.string.isRequired,
    isStarred:  PropTypes.bool.isRequired,
    isArchived: PropTypes.bool.isRequired,
    
    name: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    publisher: PropTypes.string,
    city:      PropTypes.string,
    year:      PropTypes.number,
    edition:   PropTypes.string,
    startPage: PropTypes.number,
    endPage:   PropTypes.number,
    text: PropTypes.string,
    link: PropTypes.string,
    
    isSelected: PropTypes.bool.isRequired,
    
    onSelect: PropTypes.func.isRequired,
    onStar:   PropTypes.func.isRequired,
    onDrop:   PropTypes.func.isRequired,

    onDataUpdate: PropTypes.func.isRequired
};

const defaultProps = {
    authors:   [],
    publisher: "",
    city:      "",
    edition:   "",
    text:      "",
    link:      "",
};

class Reference extends React.Component {

    state = {
        isModalOpen: false
    }

    onStar = () => this.props.onStar({ type: REFERENCE, id: this.props.id });

    toggleModal = () => 
        this.setState( ({ isModalOpen }) => ({ isModalOpen: !isModalOpen }) );
    
    onDrop = dropTarget => this.props.onDrop({ ...dropTarget, itemType: REFERENCE });

    render() {
        const icon = {
            width:  90,
            height: 90,
            path:   reference
        };

        const {
            name, authors,
            publisher, city, year,
            startPage, endPage,
            edition, text, link,
            ...rest
        } = this.props;

        const values = {
            name, authors, 
            publisher, city, year,
            edition, startPage, 
            endPage, text, link
        };

        return (
            <Fragment>
                <Item
                    {...this.props}
                    icon={icon}
                    onStar={ this.onStar }
                    onOpen={ this.toggleModal }
                    onDrop={ this.onDrop }
                    style={{ fill: "#3842cede" }}
                />
                <ReferenceModal
                    isEditing={ true }
                    isOpen={ this.state.isModalOpen }
                    toggle={ this.toggleModal }
                    values={ values }

                    {...rest}
                />
            </Fragment>
        );
    }
}

Reference.propTypes    = propTypes;
Reference.defaultProps = defaultProps;

export default Reference;