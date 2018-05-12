"use strict";

const validateId = id => Promise.resolve( Boolean(id.trim().length === 24) );

const validateName = name => Promise.resolve( Boolean(name.trim()) );

const validateEmail = email => Promise.resolve( Boolean(email.trim()) );

const validateDate = date => Promise.resolve( Boolean(date.getTime() <= new Date().getTime()) );

module.exports = exports = {
    validateId,
    validateName,
    validateEmail,
    validateDate
};