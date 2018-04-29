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
function request({ url, data, method, acceptCodes = [], errorMsg = "Error occured" }) {
    return fetch( url, {
        method,
        body: JSON.stringify(data),
        headers : {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
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
    post:   params => request({ ...params, method: "POST"   }),
    put:    params => request({ ...params, method: "PUT"    }),
    patch:  params => request({ ...params, method: "PATCH"  }),
    delete: params => request({ ...params, method: "DELETE" })
};