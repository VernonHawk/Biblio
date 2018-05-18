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
import params from "./params-rename.json";

const propTypes = {
    item: PropTypes.object.isRequired,

    isOpen:   PropTypes.bool.isRequired,
    toggle:   PropTypes.func.isRequired,

    onDataUpdate: PropTypes.func.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class RenameModal extends React.Component {

    // errors
    state = {
        name: ""
    }

    toggle = () => this.props.toggle();

    onSubmit = form => {
        const { newState, valid } = this.getStateAfterValidation(form);

        this.setState(newState);
        
        if (valid) {
            const { item: { _id, type }, onAlert, onDataUpdate, onSignOut } = this.props;

            const acceptCodes = [403];
            const errorMsg = errors.RENAME_ITEM;
            
            const data = { name: form.name, id: _id };
            
            return fetcher.patch({ url: `${type}`, data, acceptCodes, errorMsg })
                .then( json => { // error || { name, token }
                    const error = json.error;
                    
                    if (error) {
                        onSignOut();

                        onAlert({ type: alerts.WARNING, msg: errors.TOKEN_EXPIRED });
                    } else {
                        const { name, token } = json;

                        localStorage.setItem("token", token);

                        onAlert({ type: alerts.SUCCESS, 
                                  msg: `Item was successfuly renamed to ${name}` });
                        
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
            newState.name = "Item name can't be empty or consist only of whitespaces";
            valid = false;
        }

        return { newState, valid };
    }

    render() {
        const { isOpen, item } = this.props;

        return (
            <Modal isOpen={isOpen} toggle={ this.toggle }>
                <ModalHeader toggle={ this.toggle }>Rename { item.name }</ModalHeader>
                <ModalBody>
                    <GenericForm 
                        params={ params }
                        onSubmit={ this.onSubmit }
                        errors={ this.state }
                        values={ item }
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

RenameModal.propTypes = propTypes;

export default RenameModal;