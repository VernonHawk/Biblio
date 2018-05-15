import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import RecentSidebar from "./RecentSidebar";

import { 
    fetchData, updateItems, getSelected, getItemsAfterSelection
} from "../Helper";

import ItemsContainer from "../ItemsContainer/ItemsContainer";

import errors  from "assets/errorMessages.json";
import success from "assets/successMessages.json";
import alerts  from "components/GlobalAlert/alert-types.json";

const propTypes = {
    // Injected by router
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,
    
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

        return fetchData({ path: "recent", onSignOut, onAlert })
            .then( data => this.setState({ data }) );
    }

    onStarSelected = () => {
        const params = { isStarred: true };
        const errorMsg = errors.STAR_ITEMS;
        const succMsg = success.ITEMS_STARRED;
        
        this.updateSelected({ params, errorMsg, succMsg });
    }

    onArchiveSelected = () => {
        const params = { isArchived: true, isStarred: false };
        const errorMsg = errors.ARCHIVE_ITEMS;
        const succMsg = success.ITEMS_ARCHIVED;
        
        this.updateSelected({ params, errorMsg, succMsg });
    }

    updateSelected = params => {
        const items = getSelected(this.state.data);

        this.updateData({ items, ...params });
    }

    updateData = ({ items, params, errorMsg, succMsg }) => {
        const { onSignOut, onAlert } = this.props;
        const data = { items, params };

        updateItems({ data, errorMsg, onSignOut })
            .then( this.fetchDataState )
            .then( onAlert({ type: alerts.SUCCESS, msg: succMsg }) );
    }

    render() {
        const { data } = this.state;

        const selected = data ? getSelected(this.state.data) : [];

        return (
            <Row>
                <Col xs="9">
                    <h3>Recent</h3>
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
                    <RecentSidebar 
                        selectedItems={ selected }

                        onStarSelected={ this.onStarSelected }
                        onArchiveSelected={ this.onArchiveSelected }
                        onDataUpdate={ this.fetchDataState }

                        onSignOut={ this.props.onSignOut }
                        onAlert={ this.props.onAlert }
                    />
                </Col>
            </Row>
        );
    }
}

Recent.propTypes = propTypes;

export default Recent;