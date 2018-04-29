const User = require("../models/User");

/**
 * Get User by email
 * 
 * @async
 * 
 * @param {String} email User email
 * 
 * @returns {Promise.<User, Error>} promise of user
 */
const getByEmail = email => User.findOne({ email });

/**
 * Save user
 * 
 * @async
 * 
 * @param {Object} params User attributes
 * @param {String} params.email Email
 * @param {String} params.pass Password hash
 * @param {String} params.salt Salt
 * 
 * @returns {Promise.<User, Error>} promise of user
 */
const save = params => new User(params).save();

module.exports = {
    getByEmail,
    save
};