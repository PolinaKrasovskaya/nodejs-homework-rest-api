const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/contacts");

const { validation, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.add), ctrlWrapper(ctrl.add));

router.patch('/:contactId/favorite', isValidId, validation(schemas.updateFavorite), ctrlWrapper(ctrl.updateStatusContact));

router.put('/:contactId', isValidId, validation(schemas.add), ctrlWrapper(ctrl.updateById));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;