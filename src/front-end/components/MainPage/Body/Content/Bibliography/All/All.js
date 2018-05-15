import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";

import Items   from "../Items/Items";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "components/Loader/Loader";

import { 
    fetchData, updateItems, getSelected 
} from "./AllHelper";

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
        this.updateStateWithData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.folder !== prevProps.match.params.folder) {
            
            this.props.history.push(prevProps.location.pathname);
            this.props.history.push(this.props.location.pathname);
            
            this.updateStateWithData();
        }
    }

    updateStateWithData = () => {
        const { match, userId, onAlert, onSignOut } = this.props;
            
        let folderId = (match && match.params.folder) || userId;
        
        return fetchData({ folderId, onSignOut })
            .then( fetched => {
                const data = fetched.map( item => ({ ...item, isSelected: false }) );

                this.setState({ data, folderId });
            })
            .catch( err => {
                onAlert({ type: alerts.DANGER, msg: err.message });
            });
    }

    onItemSelect = id => {
        const newData = this.state.data.slice();

        const index = newData.findIndex( el => el._id === id );
        
        newData[index].isSelected = !newData[index].isSelected;

        this.setState({ data: newData });
    }

    onItemDrop = ({ itemId, targetId, itemType }) => { // itemId, targetId, itemType
        const data = [{ _id: itemId, folderId: targetId, type: itemType }];
        const errorMsg = errors.MOVE_ITEM;
        
        this.updateItemsAndState({ data, errorMsg, succMsg: success.ITEM_MOVED });
    }

    onItemStar = item => {
        const data = { items: [item], params: { isStarred: !item.isStarred } };
        const errorMsg = errors.STAR_ITEM;
        const succMsg = item.isStarred ? success.ITEM_UNSTARRED : success.ITEM_STARRED;
        
        this.updateItemsAndState({ data, errorMsg, succMsg });
    }

    onStarSelected = () => {
        const selected = getSelected(this.state.data);
        const data = { items: selected, params: { isStarred: true } };
        const errorMsg = errors.STAR_ITEMS;
        
        this.updateItemsAndState({ data, errorMsg, succMsg: success.ITEMS_STARRED });
    }

    onArchiveSelected = () => {
        const selected = getSelected(this.state.data);
        const data = { items: selected, params: { isArchived: true, isStarred: false } };
        const errorMsg = errors.ARCHIVE_ITEMS;
        
        this.updateItemsAndState({ data, errorMsg, succMsg: success.ITEMS_ARCHIVED });
    }

    updateItemsAndState = ({ data, errorMsg, succMsg }) => {
        const { onSignOut, onAlert } = this.props;

        updateItems({ data, errorMsg, onSignOut })
            .then( this.updateStateWithData )
            .then( onAlert({ type: alerts.SUCCESS, msg: succMsg }) )
            .catch( err => onAlert({ type: alerts.DANGER, msg: err.message }) );
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
                    { data === null ? 
                        <Loader /> :
                        <Items 
                            data={ data }

                            onItemSelect={ this.onItemSelect }
                            onItemStar={ this.onItemStar }
                            onItemDrop={ this.onItemDrop }
                            onDataUpdate={ this.updateStateWithData }
                            
                            onSignOut={ this.props.onSignOut }
                            onAlert={ this.props.onAlert }
                        />
                    }
                </Col>
                <Col xs="3">
                    <Sidebar 
                        selectedItems={ selected }
                        folderId={ folderId }

                        onStarSelected={ this.onStarSelected }
                        onArchiveSelected={ this.onArchiveSelected }
                        onDataUpdate={ this.updateStateWithData }

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