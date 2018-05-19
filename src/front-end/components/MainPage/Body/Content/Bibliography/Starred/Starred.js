import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import StarredSidebar from "./StarredSidebar";

import { 
    fetchData, updateItems, 
    getSelected, getItemsAfterSelection,
    archiveSelected, unstarSelected
} from "../Helper";

import ItemsContainer from "../ItemsContainer/ItemsContainer";

import alerts from "components/GlobalAlert/alert-types.json";

const propTypes = {
    // Injected by router
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,
    
    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class Starred extends React.PureComponent {

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

        return fetchData({ url: "starred", onSignOut, onAlert })
            .then( data => this.setState({ data }) );
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
        const { data } = this.state;

        const selected = data ? getSelected(this.state.data) : [];

        return (
            <Row>
                <Col xs="9">
                    <h3>Starred</h3>
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
                    <StarredSidebar 
                        selectedItems={ selected }

                        onUnstarSelected={ () => unstarSelected(this.updateSelected) }
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

Starred.propTypes = propTypes;

export default Starred;