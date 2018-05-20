import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import RecentSidebar from "./RecentSidebar";

import {
    fetchData, updateItems,
    getSelected, getItemsAfterSelection,
    archiveSelected, starSelected
} from "../Helper";

import ItemsContainer from "../ItemsContainer/ItemsContainer";

import alerts  from "components/GlobalAlert/alert-types.json";

const propTypes = {
    // Injected by router
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    search: PropTypes.string.isRequired,
    
    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class Recent extends React.PureComponent {

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

        return fetchData({ url: "recent", onSignOut, onAlert })
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

    render() {
        const { data } = this.state;
        const { search, onSignOut, onAlert } = this.props;

        let selected = [];
        let filteredData = data;

        if (data) {
            filteredData = data.filter( item => item.name.includes(search) );
            selected = getSelected(filteredData);
        }

        return (
            <Row>
                <Col xs="9">
                    <h3>Recent</h3>
                    <hr />
                    <ItemsContainer
                        data={ filteredData }
                        updateData={ this.updateData }
                        onItemSelect={ this.onItemSelect }
                        onDataUpdate={ this.fetchDataState }

                        onSignOut={ onSignOut }
                        onAlert={ onAlert }
                    />
                </Col>
                <Col xs="3">
                    <RecentSidebar 
                        selectedItems={ selected }

                        onStarSelected={ () => starSelected(this.updateSelected) }
                        onArchiveSelected={ () => archiveSelected(this.updateSelected) }
                        onDataUpdate={ this.fetchDataState }

                        onSignOut={ onSignOut }
                        onAlert={ onAlert }
                    />
                </Col>
            </Row>
        );
    }
}

Recent.propTypes = propTypes;

export default Recent;