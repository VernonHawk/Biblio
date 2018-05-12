const Folder = require("../models/Folder");

/**
 * Get Folder by id
 * 
 * @async
 * 
 * @param {String} id Folder id
 * 
 * @returns {Promise.<Folder, Error>} promise of folder
 */
const getById = id => Folder.findById(id);

/**
 * Save Folder
 * 
 * @async
 * 
 * @param {Object} params Folder attributes
 * @param {String} params.name     Name
 * @param {String} params.parentId Parent folder Id
 * @param {String} params.userId   User Id
 * 
 * @returns {Promise.<Folder, Error>} promise of folder
 */
const save = params => new Folder(params).save();

module.exports = {
    getById,
    save
};