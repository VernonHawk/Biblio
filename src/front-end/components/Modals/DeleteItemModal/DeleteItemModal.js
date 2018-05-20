import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, ModalBody, ModalHeader, ModalFooter,
    Button
} from "reactstrap";

const propTypes = {
    isOpen:    PropTypes.bool.isRequired,
    toggle:    PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

function DeleteItemModal({ isOpen, toggle, onConfirm }) {
    const onClick = () => {
        toggle();
        onConfirm();
    };

    return (
        <Modal isOpen={ isOpen } toggle={ toggle }>
            <ModalHeader toggle={ toggle }>Delete selected items</ModalHeader>
            <ModalBody>
                <div>Are you sure you want to delete these items?</div>
                <div>{ "All folder's contents will be lost as well." }</div>
            </ModalBody>
            <ModalFooter className="justify-content-between">
                <Button color="warning" onClick={ onClick }>Yes, I do</Button>
                <Button color="primary" onClick={ toggle }>{ "No, I don't" }</Button>
            </ModalFooter>
        </Modal>
    );
}

DeleteItemModal.propTypes = propTypes;

export default DeleteItemModal;