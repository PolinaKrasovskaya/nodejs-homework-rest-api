const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/contacts");
const { authenticate, validation, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validation(schemas.add), ctrlWrapper(ctrl.add));

router.patch('/:contactId/favorite', isValidId, validation(schemas.updateFavorite), ctrlWrapper(ctrl.updateStatusContact));

router.put('/:contactId', isValidId, validation(schemas.add), ctrlWrapper(ctrl.updateById));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;