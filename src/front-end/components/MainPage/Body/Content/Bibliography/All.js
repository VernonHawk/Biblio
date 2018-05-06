import React from "react";
import PropTypes from "prop-types";
import { Breadcrumbs, Row, Col } from "reactstrap";
//import { Switch, Route } from "react-router-dom";

import Items   from "./Items/Items";
import Sidebar from "./Sidebar/Sidebar";

const propTypes = {
    // Injected by router
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    userId:  PropTypes.string.isRequired,
    
    onAlert: PropTypes.func.isRequired
};

class All extends React.Component {

    state = {
        data: []
    }

    static getDerivedStateFromProps(nextProps) {
        let fetched = [];
        
        //TODO: fetch data from server based on nextProps.match.params.folder for userId
        fetched = [
            { 
                id: "0",
                name: "Very long-long name to display",
                type: "folder",
                isStarred:  false
            },
            { 
                id: "1",
                name: "Very long-long name to display",
                type: "folder",
                isStarred:  true
            },
            { 
                id: "2",
                name: "Very long-long name to display",
                type: "folder",
                isStarred:  true
            },
            { 
                id: "3",
                name: "Very long-long name to display",
                type: "folder",
                isStarred:  false
            },
            { 
                id: "4",
                name: "Very long-long name to display",
                type: "reference",
                isStarred:  false
            },
            { 
                id: "5",
                name: "Very long-long name to display",
                type: "reference",
                isStarred:  true
            },
            { 
                id: "6",
                name: "Very long-long name to display",
                type: "reference",
                isStarred:  true
            },
            { 
                id: "7",
                name: "Very long-long name to display",
                type: "reference",
                isStarred:  false
            },
        ];

        const data = fetched.map( item => ({ ...item, isSelected: false }) );

        return { data };
    }

    onItemSelect = id => {
        const newData = this.state.data.slice();

        const index = newData.findIndex( el => el.id === id );
        
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
        const selected = this.state.data.filter( el => el.isSelected );

        //TODO: send request
        console.log("star", selected);
    }

    onDeleteSelected = () => {
        const selected = this.state.data.filter( el => el.isSelected );

        //TODO: send request
        console.log("delete", selected);
    }

    render() {
        const data = this.state.data;

        const itemsSelected = data.some( el => el.isSelected );

        return (
            <Row>
                <Col xs="9">
                    <div>Home / Dir / Dir2 / Dir 3</div>
                    <hr />
                    <Items 
                        data={ data }
                        onItemSelect={ this.onItemSelect }
                        onItemStar={ this.onItemStar }
                        onItemDrop={ this.onItemDrop }
                        onAlert={ this.props.onAlert }
                    />
                </Col>
                <Col xs="3">
                    <Sidebar 
                        itemsSelected={ itemsSelected }
                        onStarSelected={ this.onStarSelected}
                        onDeleteSelected={ this.onDeleteSelected}
                    />
                </Col>
            </Row>
        );
    }
}

All.propTypes = propTypes;

export default All;