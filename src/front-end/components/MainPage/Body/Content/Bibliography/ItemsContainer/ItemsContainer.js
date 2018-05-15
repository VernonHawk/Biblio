import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Items   from "./Items/Items";
import Loader from "components/Loader/Loader";

import errors  from "assets/errorMessages.json";
import success from "assets/successMessages.json";

const propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    
    updateData:   PropTypes.func.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onDataUpdate: PropTypes.func.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class ItemsContainer extends React.PureComponent {

    onItemDrop = ({ itemId, targetId, itemType }) => {
        const items = [{ _id: itemId, type: itemType }];
        const params = { folderId: targetId };
        const errorMsg = errors.MOVE_ITEM;
        
        this.props.updateData({ items, params, errorMsg, succMsg: success.ITEM_MOVED });
    }

    onItemStar = item => {
        const items = [item];
        const params = { isStarred: !item.isStarred };
        const errorMsg = errors.STAR_ITEM;
        const succMsg = item.isStarred ? success.ITEM_UNSTARRED : success.ITEM_STARRED;
        
        this.props.updateData({ items, params, errorMsg, succMsg });
    }

    render() {
        const { 
            data, onSignOut, onAlert, onDataUpdate, onItemSelect 
        } = this.props;
        
        return (
            <Fragment>
                { data === null ? 
                    <Loader /> :
                    <Items 
                        data={ data }

                        onItemSelect={ onItemSelect }
                        onItemStar={ this.onItemStar }
                        onItemDrop={ this.onItemDrop }
                        onDataUpdate={ onDataUpdate }
                        
                        onSignOut={ onSignOut }
                        onAlert={ onAlert }
                    />
                }
            </Fragment>
        );
    }
}

ItemsContainer.propTypes = propTypes;

export default ItemsContainer;