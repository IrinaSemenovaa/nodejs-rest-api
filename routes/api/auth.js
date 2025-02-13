const express = require("express");

const ctrl = require("../../controllers/auth");

const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerJoiSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.confirmEmail);

router.post(
  "/verify",
  validateBody(schemas.emailJoiSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginJoiSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users", authenticate, ctrl.updateSubscription);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
