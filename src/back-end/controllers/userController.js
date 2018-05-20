const crypto = require("crypto");

const User = require("../DAL/UserDAL");

const { getJWToken, decodeRequestToken } = require("../common/tokens");

const TokenError = require("../errors/TokenError");
const PropError  = require("../errors/PropError");

// #region Help
const processError = res => 
                     error => {
    if (error instanceof TokenError) {
        return res.status(403).json({ error });
    } else if (error instanceof PropError) {
        return res.status(400).json({ error });
    }
    
    const noFound = { cause: "id", message: "No user found with such Id" };

    return res.status(400).json({ error: noFound });
};

function validation(params) {
    let error = {};
    
    const paramsPresent = () => new Promise( resolve => {
        if (!params) {
            error = { cause: "update user", message: "Not all obligatory arguments were specified" };
            
            return resolve(false);
        }
        
        return resolve(true);
    });

    const { username, pass } = params;

    const validName = () => new Promise( resolve => {
        if (username && !username.trim()) {
            error = { cause: "username", message: "Username can't be empty or consist only of whitespace" };

            return resolve(false);
        }

        return resolve(true);
    });

    const validPassword = () => new Promise( resolve => { 
        if (pass) {
            const passLength = {
                min: 6,
                max: 50
            };

            if (pass.length < passLength.min) {
                error = { cause: "pass", message: `Password is too short. Min length is ${passLength.min}` };
        
                return resolve(false);
            } else if (pass.length > passLength.max) {
                error = { cause: "pass", message: `Password is too long. Max length is ${passLength.max}` };
        
                return resolve(false);
            }
        }

        return resolve(true);
    });

    return Promise.all([ paramsPresent(), validName(), validPassword() ])
        .then( results => ({ error, valid: results.every(res => res) }) );
}
//#endregion

// #region Controllers
function getUserInfo(req, res) {
    return decodeRequestToken(req)
        .then( ({ data }) => User.getById(data) )
        .then( ({ _id, username, email }) => 
            res.status(200).json({
                id: _id, username, email, token: getJWToken(_id)
            })
        )
        .catch( err => processError(res)(err) );
}

function updateUser(req, res) {
    const params = req.body;

    let error = {};
    let userId = "";

    return validation(params)
        .then( ({ err, valid }) => {
            if (!valid) {
                throw new PropError(err);
            } else {
                return decodeRequestToken(req);
            }
        })
        .then( ({ data }) => {
            userId = data;

            if (params.email) {
                params.email = params.email.toLowerCase();

                return User.getByEmail(params.email)
                    .then( user => {
                        if (user && user._id !== userId) {
                            error = { cause: "email", message: "This email is already taken" };
            
                            throw new PropError(error);
                        }

                        return Promise.resolve({ _id: userId });
                    });
            }

            return Promise.resolve({ _id: userId });
        })
        .then( ({ _id }) => {
            if (params.pass) {
                // Encrypt user password
                params.salt = crypto.randomBytes(16).toString("hex"); 

                params.pass = crypto.createHmac("sha512", params.pass)
                                    .update(params.salt).digest("hex");
            }
            console.log(params);
            return User.update({ id: _id, params });
        })
        .then( ({ _id }) => res.status(200).json({ token: getJWToken(_id) }) )
        .catch( err => processError(res)(err) );
}

function deleteUser(req, res) {
    let error = {};

    error = { cause: "delete user", message: "Not implemented" };

    res.status(400).json({ error });
    /*decodeRequestToken(req)
        .then( ({ data }) => User.getById(data) )
        .then( ({ _id, username, email }) => 
            res.status(200).json({
                id: _id, username, email, token: getJWToken(_id)
            })
        )
        .catch( err => {
            if (err instanceof TokenError) {
                error = { cause: err.cause, message: err.message };
                return res.status(403).json({ error });
            }

            error = { cause: "id", message: "No user found with such Id" };

            return res.status(400).json({ error });
        });*/
}
// #endregion

module.exports = exports = {
    getUserInfo,
    updateUser,
    deleteUser
};