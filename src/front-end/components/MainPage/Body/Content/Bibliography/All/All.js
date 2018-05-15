import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";

import AllSidebar from "./AllSidebar";

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

        return fetchData({ path: folderId, onSignOut, onAlert })
            .then( data => this.setState({ data, folderId }) );
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

All.propTypes = propTypes;

export default All;