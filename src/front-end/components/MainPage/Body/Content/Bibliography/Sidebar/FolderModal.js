import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, ModalBody, ModalHeader, ModalFooter,
    Button
} from "reactstrap";

const propTypes = {
    isOpen:   PropTypes.bool.isRequired,
    toggle:   PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

class FolderModal extends React.Component {

    toggle = () => this.props.toggle("folderModal");

    render() {
        const { isOpen, onSubmit } = this.props;
        // TODO: Reuse AuthForm
        return (
            <Modal isOpen={isOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>New folder</ModalHeader>
                <ModalBody>
                    test
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={ onSubmit }>Save</Button>
                    <Button color="warning" onClick={ this.toggle }>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

FolderModal.propTypes = propTypes;

export default FolderModal;