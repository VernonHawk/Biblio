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
    id:       PropTypes.string,
    folderId: PropTypes.string.isRequired,
    values:   PropTypes.object,

    isEditing: PropTypes.bool.isRequired,
    isOpen:    PropTypes.bool.isRequired,
    toggle:    PropTypes.func.isRequired,

    onDataUpdate: PropTypes.func.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

const defaultProps = {
    values: {}
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
        const reference = { authors: parseAuthors(authors.toString()), 
                            ...parseNumbers({ startPage, endPage, year }),
                            ...rest };

        getStateAfterValidation(reference)
            .then( ({ newState, valid }) => {
                this.setState(newState);

                if (valid) {
                    const { 
                        id, folderId, isEditing, 
                        onAlert, onDataUpdate, onSignOut
                    } = this.props;

                    const acceptCodes = [403];
                    const errorMsg = errors.ADD_REFERENCE;

                    let data = { ...reference, folderId };
                    let method = fetcher.post;
                    let action = "created";

                    if (isEditing) {
                        data.id = id;
                        method =  fetcher.patch;
                        action =  "updated";
                    }

                    return method({ url: "/reference", data, acceptCodes, errorMsg })
                        .then( json => { // error || { name, token }
                            const error = json.error;
                            
                            if (error) {
                                onSignOut();

                                onAlert({ type: alerts.WARNING, msg: errors.TOKEN_EXPIRED });
                            } else {
                                const { name, token } = json;

                                localStorage.setItem("token", token);

                                onAlert({ 
                                    type: alerts.SUCCESS, 
                                    msg: `Reference ${name} was successfuly ${action}` 
                                });
                                
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
        const { isOpen, isEditing, values } = this.props;
        
        return (
            <Modal isOpen={isOpen} toggle={ this.toggle }>
                <ModalHeader toggle={ this.toggle }>
                    { isEditing ? values.name : "New reference" }
                </ModalHeader>
                <ModalBody>
                    <GenericForm 
                        params={ params }
                        onSubmit={ this.onSubmit }
                        errors={ this.state }
                        values={ values }
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

Reference.propTypes    = propTypes;
Reference.defaultProps = defaultProps;

export default Reference;