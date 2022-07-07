const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");

const removeById = async (req, res, next) => {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result) {
        throw createError(404);
    }
    res.json({message:"contact deleted"});
};

module.exports = removeById;