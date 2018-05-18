import fetcher from "fetcher";

import errors from "assets/errorMessages.json";
import alerts from "components/GlobalAlert/alert-types.json";

function fetchData({ path, onSignOut, onAlert }) {
    const acceptCodes = [400, 403];
    const errorMsg = errors.LOAD_DATA;
    
    return fetcher.get({ url: `${path}`, acceptCodes, errorMsg })
        .then( json => { // error || { data, token }
            const error = json.error;
            
            if (error) {
                if (error.cause === "token") {
                    onSignOut();
    
                    throw new Error(errors.TOKEN_EXPIRED);
                } else {
                    throw new Error(errors.FOLDER_NOT_FOUND);
                }
            } else {
                const { data, token } = json;

                localStorage.setItem("token", token);

                const maped = data.map( item => ({ ...item, isSelected: false }) );

                return Promise.resolve(maped);
            }
        })
        .catch( err => onAlert({ type: alerts.DANGER, msg: err.message }) );
}

function updateItems({ data, errorMsg, onSignOut }) {
    const acceptCodes = [403];
    
    return fetcher.patch({ url: "items", data, acceptCodes, errorMsg })
        .then( json => { // error || { token }
            const error = json.error;
            
            if (error) {
                onSignOut();

                throw new Error(errors.TOKEN_EXPIRED);
            } else {
                localStorage.setItem("token", json.token);
                
                return Promise.resolve();
            }
        });
}

function getItemsAfterSelection({ id, data }) {
    const newData = data.slice();

    const index = newData.findIndex( el => el._id === id );
    
    newData[index].isSelected = !newData[index].isSelected;

    return { data: newData };
}

const getSelected = data => data.filter( el => el.isSelected );

export {
    fetchData,
    updateItems,
    getItemsAfterSelection,
    getSelected
};