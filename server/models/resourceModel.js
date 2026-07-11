const db = require("../config/db");

// Get All
const getAllResources = (callback) => {

    db.query("SELECT * FROM resources", callback);

};

// Get One
const getResourceById = (id, callback) => {

    db.query(
        "SELECT * FROM resources WHERE id = ?",
        [id],
        callback
    );

};

// Create
const createResource = (resource, callback) => {

    db.query(

        "INSERT INTO resources(title,description,category) VALUES(?,?,?)",

        [
            resource.title,
            resource.description,
            resource.category
        ],

        callback

    );

};

// Update
const updateResource = (id, resource, callback) => {

    db.query(

        `UPDATE resources
        SET title=?,
            description=?,
            category=?
        WHERE id=?`,

        [
            resource.title,
            resource.description,
            resource.category,
            id
        ],

        callback

    );

};

// Delete
const deleteResource = (id, callback) => {

    db.query(

        "DELETE FROM resources WHERE id=?",

        [id],

        callback

    );

};

module.exports = {

    getAllResources,

    getResourceById,

    createResource,

    updateResource,

    deleteResource

};