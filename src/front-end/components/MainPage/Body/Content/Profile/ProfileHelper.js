import fetcher from "fetcher";

import errors  from "assets/errorMessages.json";
import alerts  from "components/GlobalAlert/alert-types.json";

function updateUser({ data, errorMsg, succMsg, 
                      onSignOut, onAlert, onDataUpdate, 
                      toggle, setState }) {
    const acceptCodes = [400, 403];
    
    return fetcher.patch({ url: "user", data, acceptCodes, errorMsg })
        .then( json => {
            const error = json.error;
            
            if (error) {
                if (error.cause === "token") {
                    onSignOut();
                    
                    throw new Error(errors.TOKEN_EXPIRED);
                } else {
                    setState({ [error.cause]: error.message });
                }
            } else {
                localStorage.setItem("token", json.token);
                
                onDataUpdate();
                
                toggle();
            }
        })
        .then( onAlert({ type: alerts.SUCCESS, msg: succMsg }) )
        .catch( err => onAlert({ type: alerts.DANGER, msg: err.message }) );
}

export {
    updateUser
};