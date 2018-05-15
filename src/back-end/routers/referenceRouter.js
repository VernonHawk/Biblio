"use strict";

const express = require("express");

const User      = require("../DAL/UserDAL");
const Folder    = require("../DAL/FolderDAL");
const Reference = require("../DAL/ReferenceDAL");

const { getJWToken, decodeRequestToken } = require("../common/tokens");

const TokenError = require("../errors/TokenError");
const PropError  = require("../errors/PropError");

const router = express.Router();

router.post("/", (req, res) => {
    const { folderId, name, startPage, endPage, year, ...rest } = req.body;

    let error = {};

    if (!name || !folderId) {
        error = { cause: "add reference", message: "Not all obligatory arguments were specified" };

        return res.status(400).json({ error });
    }

    const trimName = name.trim();

    const reference = { name: trimName, 
                        ...parseNumbers({ startPage, endPage, year }),
                        ...rest };
    
    validateReference(reference)
        .then( ({ err, valid }) => {
            if (!valid) {
                throw new PropError(err);
            } else {
                return decodeRequestToken(req)
                    .catch( err => {
                        error = { cause: "token", message: err.message };
            
                        throw new TokenError(error);
                    });
            }
        })
        .then( ({ data }) => {
            if (data === folderId) {
                return User.getById(folderId);
            } else {
                return Folder.getById(folderId);
            }
        })
        .then( folder => {
            if (!folder) {
                error = { cause: "folderId", message: "No folder found with such id" };

                throw new PropError(error);
            }

            const userId = folder.userId || folder._id;
            
            return Reference.save({
                userId,
                folderId: folder._id,
                ...reference
            });
        })
        .then( ({ name, userId }) => 
            res.status(200).json({ name, token: getJWToken(userId) })
        )
        .catch( err => {
            if (err instanceof TokenError) {
                error = { cause: err.cause, message: err.message };

                return res.status(403).json({ error });
            } else if (err instanceof PropError) {
                error = { cause: err.cause, message: err.message };

                return res.status(400).json({ error });
            }
            
            error = { cause: "reference", message: "Couldn't add new reference" };

            return res.status(500).json({ error });
        });
});

router.patch("/", (req, res) => {
    const { id, ...rest } = req.body;

    let error = {};

    if (!id) {
        error = { cause: "update reference", message: "Not all obligatory arguments were specified" };

        return res.status(400).json({ error });
    }
    
    validateReference(rest)
        .then( ({ err, valid }) => {
            if (!valid) {
                throw new PropError(err);
            } else {
                return decodeRequestToken(req)
                    .catch( err => {
                        error = { cause: "token", message: err.message };
            
                        throw new TokenError(error);
                    });
            }
        })
        .then( () => Reference.getById(id) )
        .then( reference => {
            if (!reference) {
                error = { cause: "id", message: "No reference found with such id" };

                throw new PropError(error);
            }

            reference.set(rest);

            return reference.save();
        })
        .then( ({ name, userId }) =>
            res.status(200).json({ name, token: getJWToken(userId) })
        )
        .catch( err => {
            if (err instanceof TokenError) {
                error = { cause: err.cause, message: err.message };

                return res.status(403).json({ error });
            } else if (err instanceof PropError) {
                error = { cause: err.cause, message: err.message };

                return res.status(400).json({ error });
            }
            
            error = { cause: "reference", message: "Couldn't update the reference" };

            return res.status(500).json({ error });
        });
});

function validateReference({ name, year, startPage, endPage, authors, ...rest }) {
    let err = {};

    function validName() {
        return new Promise( resolve => {
            if (name && !name.trim()) {
                err = { cause: "name", message: "Reference name can't be empty or consist only of whitespace" };

                return resolve(false);
            }

            return resolve(true);
        });
    }

    function validAuthors() {
        return new Promise( resolve => {
            if (authors) {
                if (authors.length > 50) {
                    err = { cause: "authors", message: "Authors list can't be longer than 50" };
    
                    return resolve(false);
                } else if (authors.some( el => el.length > 100 )) {
                    err = { cause: "authors", message: "Author's name can't be longer than 100 characters" };
    
                    return resolve(false);
                }
            } 

            return resolve(true);
        });
    }

    function validYear() {
        return new Promise( resolve => {
            if (year !== undefined && (year > new Date().getFullYear())) {
                err = { cause: "year", message: "Publishing year can't be later than current year" };

                return resolve(false);
            }

            return resolve(true);
        });
    }

    function validStartPage() {
        return new Promise( resolve => {
            if (startPage !== undefined && (startPage < 0 || 10000 < startPage)) {
                err = { cause: "startPage", message: "Start page number must be between 0 and 10000" };

                return resolve(false);
            } else if (startPage > parseInt(endPage)) {
                err = { cause: "startPage", message: "Start page number can't be higher than end page" };

                return resolve(false);
            }

            return resolve(true);
        });
    }

    function validEndPage() {
        return new Promise( resolve => {
            if (endPage !== undefined && (endPage < 0 || 10000 < endPage)) {
                err = { cause: "endPage", message: "End page number must be between 0 and 10000" };

                return resolve(false);
            }

            return resolve(true);
        });
    }

    function validTextLength() {
        return new Promise( resolve => {
            const textFields = name ? 
                  { ...rest, name } : 
                  { ...rest };

            for (const el in textFields) {
                if (textFields[el].length > 200) {
                    err = { 
                        cause: el,
                        message: `${el[0].toUpperCase() + el.slice(1)} field can't be longer than 200 characters`
                    };

                    return resolve(false);
                }
            }

            return resolve(true);
        });
    }

    return Promise.all([ validName(), validAuthors(), validYear(), 
                         validStartPage(), validEndPage(), validTextLength() ])
        .then( results => ({ err, valid: results.every(res => res) }) );
}

function parseNumbers(numbers) {
    const nums = {};

    for (const field in numbers) {
        nums[field] = isNaN( parseInt(numbers[field]) ) ? undefined : numbers[field];
    }

    return nums;
} 

module.exports = exports = router;