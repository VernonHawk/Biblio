/**
 * Perform fetch request
 * 
 * @async
 * 
 * @param {Object} params Request params
 * @param {String} params.url Url to fetch
 * @param {Object} params.data Body to send
 * @param {String} params.method Method to use
 * @param {Number[]} params.acceptCodes HTTP codes besides 2xx to treat as valid response codes
 * @param {String} params.errorMsg Message of an error to throw if the response code is not 2xx or in  acceptCodes
 * 
 * @returns {Promise.<Object, Error>} promise of json data
 */
function request({ url, method = "GET", data = {}, 
                   acceptCodes = [], errorMsg = "Error occured" }) {
    const options = {
        method,
        headers : {
            "Accept":       "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    };

    if (method !== "GET") {
        options.body = JSON.stringify(data);
    }

    return fetch( `/api/${url}`, options )
        .then( resp => {
            if (acceptCodes.includes(resp.status)) {
                
                return resp.json();
            }
            
            if (!resp.ok) {
                throw new Error(errorMsg);
            }

            return resp.json();
        });
}

export default {
    get:    params => request({ ...params, method: "GET"    }),
    post:   params => request({ ...params, method: "POST"   }),
    put:    params => request({ ...params, method: "PUT"    }),
    patch:  params => request({ ...params, method: "PATCH"  }),
    delete: params => request({ ...params, method: "DELETE" })
};