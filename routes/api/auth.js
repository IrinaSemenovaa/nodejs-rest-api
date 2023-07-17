const express = require("express");

const ctrl = require("../../controllers/auth");

const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerJoiSchema),
  ctrl.register
);

router.post("/login", validateBody(schemas.loginJoiSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users", authenticate, ctrl.updateSubscription);

module.exports = router;
