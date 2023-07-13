const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const validateBody = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");

const { scheme } = require("../../models/contact");

router.get("/", ctrl.getAll);
router.get("/:contactId", isValidId, ctrl.getById);
router.post("/", validateBody(scheme.contactJoiSchema), ctrl.addContact);
router.delete("/:contactId", isValidId, ctrl.deleteById);
router.put(
  "/:contactId",
  isValidId,
  validateBody(scheme.contactJoiSchema),
  ctrl.updateById
);
router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;
