const express = require("express");
const router = express.Router();

const ctrl = require("../../contactsControllers/contacts");
const  validateBody = require("../../middlewares/validateBody");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody, ctrl.addContact);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody, ctrl.updateById);

module.exports = router;
