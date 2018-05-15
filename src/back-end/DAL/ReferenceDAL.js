const Reference = require("../models/Reference");

/**
 * Get Reference by Id
 * 
 * @async
 * 
 * @param {String} id Id
 * 
 * @returns {Promise.<Reference, Error>} Promise of reference
 */
const getById = id => Reference.findById(id);

/**
 * Get References by FolderId
 * 
 * @async
 * 
 * @param {String} folderId Folder Id
 * 
 * @returns {Promise.<Reference[], Error>} Promise of references
 */
const getNotArchivedByFolderId = folderId => Reference.find({ folderId, isArchived: false }).lean().sort({ name: 1 });

/**
 * Save Reference
 * 
 * @async
 * 
 * @param {Object}   params           Reference attributes
 * @param {String}   params.name      Name
 * @param {String}   params.folderId  Folder Id
 * @param {String}   params.userId    User Id
 * @param {String[]} params.authors   Authors
 * @param {String}   params.publisher Publisher
 * @param {String}   params.city      Publishing city
 * @param {Number}   params.year      Publishing year
 * @param {String}   params.edition   Edition
 * @param {Number}   params.startPage Start Page
 * @param {Number}   params.endPage   End Page
 * @param {String}   params.text      Text
 * @param {String}   params.link      Link
 * 
 * @returns {Promise.<Reference, Error>} Promise of reference
 */
const save = params => new Reference(params).save();

/**
 * Update many references by items ids
 * 
 * @async
 * 
 * @param {Object} params Reference attributes
 * @param {String} params.ids    Ids of references to update
 * @param {String} params.params Fields with new values
 * 
 * @returns {Promise.<Reference[], Error>} Promise of references
 */
const updateManyByIds = ({ ids, params }) => Reference.updateMany(params).where("_id").in(ids).exec();

module.exports = {
    getById,
    getNotArchivedByFolderId,
    save,
    updateManyByIds
};