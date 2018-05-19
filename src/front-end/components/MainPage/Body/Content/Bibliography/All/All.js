import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";

import AllSidebar from "./AllSidebar";

import {
    fetchData, updateItems,
    getItemsAfterSelection, getSelected,
    archiveSelected, starSelected
} from "../Helper";

import ItemsContainer from "../ItemsContainer/ItemsContainer";

import alerts from "components/GlobalAlert/alert-types.json";

const propTypes = {
    // Injected by router
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    userId:  PropTypes.string.isRequired,
    
    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class All extends React.PureComponent {

    state = {
        data:     null,
        folderId: this.props.userId
    }

    componentDidMount() {
        this.fetchDataState();
    }

    componentDidUpdate(prevProps) {
        const { match, history, location } = this.props;

        if (match.params.folder !== prevProps.match.params.folder) {
            history.push(prevProps.location.pathname);
            history.push(location.pathname);
            
            this.fetchDataState();
        }
    }

    onItemSelect = id =>
        this.setState( getItemsAfterSelection({ id, data: this.state.data }) );

    fetchDataState = () => {
        const { match, userId, onAlert, onSignOut } = this.props;
            
        const folderId = (match && match.params.folder) || userId;

        return fetchData({ url: folderId, onSignOut, onAlert })
            .then( data => this.setState({ data, folderId }) );
    }

    updateSelected = params => {
        const items = getSelected(this.state.data);

        return this.updateData({ items, ...params });
    }

    updateData = ({ items, params, errorMsg, succMsg }) => {
        const { onSignOut, onAlert } = this.props;
        const data = { items, params };

        return updateItems({ data, errorMsg, onSignOut })
            .then( this.fetchDataState )
            .then( onAlert({ type: alerts.SUCCESS, msg: succMsg }) );
    }

    render() {
        const { data, folderId } = this.state;

        const selected = data ? getSelected(this.state.data) : [];

        return (
            <Row>
                <Col xs="9">
                    <Breadcrumb className="bg-white mb-0 p-0">
                        <BreadcrumbItem active>Home</BreadcrumbItem>
                    </Breadcrumb>
                    <hr />
                    <ItemsContainer
                        data={ data }
                        updateData={ this.updateData }
                        onItemSelect={ this.onItemSelect }
                        onDataUpdate={ this.fetchDataState }
                        onSignOut={ this.props.onSignOut }
                        onAlert={ this.props.onAlert }
                    />
                </Col>
                <Col xs="3">
                    <AllSidebar 
                        selectedItems={ selected }
                        folderId={ folderId }

                        onStarSelected={ () => starSelected(this.updateSelected) }
                        onArchiveSelected={ () => archiveSelected(this.updateSelected) }
                        onDataUpdate={ this.fetchDataState }

                        onSignOut={ this.props.onSignOut }
                        onAlert={ this.props.onAlert }
                    />
                </Col>
            </Row>
        );
    }
}

All.propTypes = propTypes;

export default All;