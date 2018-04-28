function request({ url, data, method }) {
    return fetch( url, {
        method,
        body: JSON.stringify(data),
        headers : {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
}

export default {
    post:   params => request({ ...params, method: "POST"   }),
    put:    params => request({ ...params, method: "PUT"    }),
    patch:  params => request({ ...params, method: "PATCH"  }),
    delete: params => request({ ...params, method: "DELETE" })
};