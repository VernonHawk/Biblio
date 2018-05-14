import fetcher from "fetcher";

import errors from "assets/errorMessages.json";

function fetchData({ folderId, onSignOut }) {
    const acceptCodes = [400, 403];
    const errorMsg = errors.LOAD_DATA;
    
    return fetcher.get({ url: `/${folderId}`, acceptCodes, errorMsg })
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
                
                return Promise.resolve(data);
            }
        });
}

const getSelected = data => data.filter( el => el.isSelected );

export {
    fetchData,
    getSelected
};