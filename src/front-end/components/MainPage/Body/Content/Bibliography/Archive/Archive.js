import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import ArchiveSidebar from "./ArchiveSidebar";

import { 
    fetchData, updateItems, 
    getSelected, getItemsAfterSelection,
    unarchiveSelected, starSelected, deleteItems
} from "../Helper";

import ItemsContainer from "../ItemsContainer/ItemsContainer";

import alerts from "components/GlobalAlert/alert-types.json";
import success from "assets/successMessages.json";

const propTypes = {
    // Injected by router
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,
    
    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class Archive extends React.PureComponent {

    state = {
        data: null
    }

    componentDidMount() {
        this.fetchDataState();
    }

    onItemSelect = id =>
        this.setState( getItemsAfterSelection({ id, data: this.state.data }) );

    fetchDataState = () => {
        const { onAlert, onSignOut } = this.props;

        return fetchData({ url: "archive", onSignOut, onAlert })
            .then( data => this.setState({ data }) );
    }

    updateSelected = params => {
        const items = getSelected(this.state.data);
        
        return this.updateData({ items, ...params });
    }

    updateData = ({ items, params, errorMsg, succMsg }) => {
        const { onSignOut, onAlert } = this.props;
        const data = { items, params };
        
        return updateItems({ data, errorMsg, onSignOut, onAlert })
            .then( this.fetchDataState )
            .then( onAlert({ type: alerts.SUCCESS, msg: succMsg }) );
    }

    deleteSelected = () => {
        const { onSignOut, onAlert } = this.props;

        const items = getSelected(this.state.data);
        const msg   = success.ITEMS_DELETED;

        return deleteItems({ data: { items }, onSignOut, onAlert })
            .then( this.fetchDataState )
            .then( onAlert({ type: alerts.SUCCESS, msg }) );
    }

    render() {
        const { data } = this.state;

        const selected = data ? getSelected(this.state.data) : [];

        return (
            <Row>
                <Col xs="9">
                    <h3>Archive</h3>
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
                    <ArchiveSidebar 
                        selectedItems={ selected }

                        onStarSelected={ () => starSelected(this.updateSelected) }
                        onUnarchiveSelected={ () => unarchiveSelected(this.updateSelected) }
                        onDeleteSelected={ this.deleteSelected }
                        onDataUpdate={ this.fetchDataState }

                        onSignOut={ this.props.onSignOut }
                        onAlert={ this.props.onAlert }
                    />
                </Col>
            </Row>
        );
    }
}

Archive.propTypes = propTypes;

export default Archive;