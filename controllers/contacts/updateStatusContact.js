const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if(!result) {
        throw createError(404, "missing field favorite");
    }
    res.json(result);
};

module.exports = updateStatusContact;