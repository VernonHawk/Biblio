import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, ModalBody, ModalHeader, ModalFooter,
    Button
} from "reactstrap";

import GenericForm from "components/GenericForm/GenericForm";

import params from "./params-folder.json";

const propTypes = {
    isOpen:   PropTypes.bool.isRequired,
    toggle:   PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

class FolderModal extends React.Component {

    // errors
    state = {
        name: ""
    }

    toggle = () => this.props.toggle("folderModal");

    onSubmit = data => {
        const { newState, valid } = this.getStateAfterValidation(data);

        this.setState(newState);
        
        if (valid) {
            // TODO: make request
            // TODO: update state if invalid
            // TODO: pass new data to Bibliography component
            this.props.onSubmit(data);
        }
    }

    getStateAfterValidation = ({ name }) => {
        const newState = { 
            name:  ""
        };

        let valid = true;
        
        if (!name.trim()) {
            newState.name = "Folder name can't consist only of whitespaces";
            valid = false;
        }

        return { newState, valid };
    }

    render() {
        const { isOpen } = this.props;
        
        return (
            <Modal isOpen={isOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>New folder</ModalHeader>
                <ModalBody>
                    <GenericForm 
                        params={params}
                        onSubmit={this.onSubmit}
                        errors={this.state}
                    >
                        <ModalFooter className="p-0 pt-3">
                            <Button color="success">Save</Button>
                            <Button color="warning" onClick={ this.toggle }>Cancel</Button>
                        </ModalFooter>
                    </GenericForm>
                </ModalBody>
            </Modal>
        );
    }
}

FolderModal.propTypes = propTypes;

export default FolderModal;