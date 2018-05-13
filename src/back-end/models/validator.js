"use strict";

const validateId = id => Promise.resolve( Boolean(id.trim().length === 24) );

const validateName = name => Promise.resolve( Boolean(name.trim()) );

const validateEmail = email => Promise.resolve( Boolean(email.trim()) );

const validateArray = arr => Promise.resolve( Boolean(arr.length <= 20) );

module.exports = exports = {
    validateId,
    validateName,
    validateEmail,
    validateArray
};