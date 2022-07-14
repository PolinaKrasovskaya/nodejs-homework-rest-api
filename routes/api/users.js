const express = require("express");

const ctrl = require("../../controllers/users");

const { ctrlWrapper } = require("../../helpers");

const { authenticate, validation } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(schemas.user), ctrlWrapper(ctrl.register));

router.post("/login", validation(schemas.user), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch('/:userId/subscription', authenticate, ctrlWrapper(ctrl.updateUserSubscription));

module.exports = router;