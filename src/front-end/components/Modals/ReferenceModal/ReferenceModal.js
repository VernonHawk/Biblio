import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, ModalBody, ModalHeader, ModalFooter,
    Button
} from "reactstrap";

import GenericForm from "components/GenericForm/GenericForm";

import { 
    getStateAfterValidation, parseAuthors, parseNumbers 
} from "./ReferenceModalHelper";

import fetcher from "fetcher";

import errors from "assets/errorMessages.json";
import alerts from "components/GlobalAlert/alert-types.json";
import params from "./params-reference.json";

const propTypes = {
    folderId: PropTypes.string.isRequired,

    isOpen:   PropTypes.bool.isRequired,
    toggle:   PropTypes.func.isRequired,

    onDataUpdate: PropTypes.func.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class Reference extends React.Component {

    // errors
    state = {
        name:      "",
        authors:   "",
        publisher: "",
        city:      "",
        year:      "",
        edition:   "",
        startPage: "",
        endPage:   "",
        text:      "",
        link:      ""
    }

    toggle = () => this.props.toggle();

    onSubmit = ({ authors, startPage, endPage, year, ...rest }) => {
        const reference = { authors: parseAuthors(authors), 
                            ...parseNumbers({ startPage, endPage, year }),
                            ...rest };

        getStateAfterValidation(reference)
            .then( ({ newState, valid }) => {
                this.setState(newState);

                if (valid) {
                    const { folderId, onAlert, onDataUpdate, onSignOut } = this.props;

                    const acceptCodes = [403];
                    const errorMsg = errors.ADD_REFERENCE;

                    const data = { ...reference, folderId };
                    
                    return fetcher.post({ url: "/reference", data, acceptCodes, errorMsg })
                        .then( json => { // error || { name, token }
                            const error = json.error;
                            
                            if (error) {
                                onSignOut();

                                onAlert({ type: alerts.WARNING, msg: errors.TOKEN_EXPIRED });
                            } else {
                                const { name, token } = json;

                                localStorage.setItem("token", token);

                                onAlert({ type: alerts.SUCCESS, 
                                        msg: `Reference ${name} was successfuly created` });
                                
                                this.toggle();

                                onDataUpdate();
                            }
                        });
                }
            })
            .catch( err => {
                this.props.onAlert({ type: alerts.DANGER, msg: err.message });
            });
    }

    render() {
        const { isOpen } = this.props;
        
        return (
            <Modal isOpen={isOpen} toggle={ this.toggle }>
                <ModalHeader toggle={ this.toggle }>New reference</ModalHeader>
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

Reference.propTypes = propTypes;

export default Reference;