const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const validateBody = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

const { scheme } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);
router.get("/:contactId", authenticate, isValidId, ctrl.getById);
router.post(
  "/",
  authenticate,
  validateBody(scheme.contactJoiSchema),
  ctrl.addContact
);
router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(scheme.contactJoiSchema),
  ctrl.updateById
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  ctrl.updateStatusContact
);

module.exports = router;
