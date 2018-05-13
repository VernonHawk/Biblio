import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, ModalBody, ModalHeader, ModalFooter,
    Button
} from "reactstrap";

import GenericForm from "components/GenericForm/GenericForm";

import fetcher from "fetcher";

import errors from "assets/errorMessages.json";
import alerts from "components/GlobalAlert/alert-types.json";
import params from "./params-folder.json";

const propTypes = {
    folderId: PropTypes.string.isRequired,

    isOpen:   PropTypes.bool.isRequired,
    toggle:   PropTypes.func.isRequired,

    onDataUpdate: PropTypes.func.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class FolderModal extends React.Component {

    // errors
    state = {
        name: ""
    }

    toggle = () => this.props.toggle();

    onSubmit = form => {
        const { newState, valid } = this.getStateAfterValidation(form);

        this.setState(newState);
        
        if (valid) {
            const { folderId, onAlert, onDataUpdate, onSignOut } = this.props;

            const acceptCodes = [403];
            const errorMsg = errors.ADD_FOLDER;

            const data = { name: form.name, folderId };
            
            return fetcher.post({ url: "/folder", data, acceptCodes, errorMsg })
                .then( json => { // error || { name, token }
                    const error = json.error;
                    
                    if (error) {
                        onSignOut();

                        onAlert({ type: alerts.WARNING, msg: errors.TOKEN_EXPIRED });
                    } else {
                        const { name, token } = json;

                        localStorage.setItem("token", token);

                        onAlert({ type: alerts.SUCCESS, 
                                  msg: `Folder ${name} was successfuly created` });
                        
                        this.toggle();

                        onDataUpdate();
                    }
                })
                .catch( err => {
                    onAlert({ type: alerts.DANGER, msg: err.message });
                });
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
            <Modal isOpen={isOpen} toggle={ this.toggle }>
                <ModalHeader toggle={ this.toggle }>New folder</ModalHeader>
                <ModalBody>
                    <GenericForm 
                        params={ params }
                        onSubmit={ this.onSubmit }
                        errors={ this.state }
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