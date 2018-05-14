import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";

import Items   from "../Items/Items";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "components/Loader/Loader";

import { fetchData, getSelected } from "./AllHelper";

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
        
        fetchData({ folderId, onSignOut })
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

    onItemStar = item => {
        //TODO: make server request
        console.log("star", item);
    }

    onItemDrop = res => {
        //TODO: make server request
        console.log("drop", res);
    }

    onStarSelected = () => {
        const selected = getSelected(this.state.data);

        //TODO: send request
        console.log("star", selected);
    }

    onDeleteSelected = () => {
        const selected = getSelected(this.state.data);

        //TODO: send request
        console.log("delete", selected);
    }

    render() {
        const { data, folderId } = this.state;

        // TODO: change to amount of items, not bool
        const itemsSelected = data ? data.some( el => el.isSelected ) : false;

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
                            
                            onAlert={ this.props.onAlert }
                        />
                    }
                </Col>
                <Col xs="3">
                    <Sidebar 
                        itemsSelected={ itemsSelected }
                        folderId={ folderId }

                        onStarSelected={ this.onStarSelected }
                        onDeleteSelected={ this.onDeleteSelected }
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